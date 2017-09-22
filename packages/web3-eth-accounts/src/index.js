/*
 This file is part of web3.js.

 web3.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 web3.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @file accounts.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

import _ from 'lodash';
import core from 'web3-core';
import Method from 'web3-core-method';
import Promise from 'bluebird';
import Account from 'eth-lib/lib/account';
import Hash from 'eth-lib/lib/hash';
import RLP from 'eth-lib/lib/rlp';
import crypto from 'crypto';
import scryptsy from 'scrypt.js';
import uuidv4 from 'uuid/v4';
import utils from 'web3-utils';
import helpers from 'web3-core-helpers';

function isNot (value) {
  return _.isUndefined(value) || _.isNull(value);
}

const Accounts = function Accounts () {
  const _this = this;

  // sets _requestmanager
  core.packageInit(this, arguments);

  // remove unecessary core functions
  delete this.BatchRequest;
  delete this.extend;

  const _ethereumCall = [
    new Method({
      name: 'getId',
      call: 'net_version',
      params: 0,
      outputFormatter: utils.hexToNumber,
    }),
    new Method({
      name: 'getGasPrice',
      call: 'eth_gasPrice',
      params: 0,
    }),
    new Method({
      name: 'getTransactionCount',
      call: 'eth_getTransactionCount',
      params: 2,
      inputFormatter: [function (address) {
        if (utils.isAddress(address)) {
          return address;
        }
        throw new Error(`Address ${address} is not a valid address to get the "transactionCount".`);
      }, function () { return 'latest'; }],
    }),
  ];

  // attach methods to this._ethereumCall
  this._ethereumCall = {};
  _.each(_ethereumCall, (method) => {
    method.attachToObject(_this._ethereumCall);
    method.setRequestManager(_this._requestManager);
  });

  this.wallet = new Wallet(this);
};

Accounts.prototype._addAccountFunctions = function (account) {
  const _this = this;

  // add sign functions
  account.signTransaction = function signTransaction (tx, callback) {
    return _this.signTransaction(tx, account.privateKey, callback);
  };
  account.sign = function sign (data) {
    return _this.sign(data, account.privateKey);
  };

  account.encrypt = function encrypt (password, options) {
    return _this.encrypt(account.privateKey, password, options);
  };


  return account;
};

Accounts.prototype.create = function create (entropy) {
  return this._addAccountFunctions(Account.create(entropy || utils.randomHex(32)));
};

Accounts.prototype.privateKeyToAccount = function privateKeyToAccount (privateKey) {
  return this._addAccountFunctions(Account.fromPrivate(privateKey));
};

Accounts.prototype.signTransaction = function signTransaction (tx, privateKey, callback) {
  const _this = this;

  function signed (tx) {
    if (!tx.gas && !tx.gasLimit) {
      throw new Error('"gas" is missing');
    }

    const transaction = {
      nonce: utils.numberToHex(tx.nonce),
      to: tx.to ? helpers.formatters.inputAddressFormatter(tx.to) : '0x',
      data: tx.data || '0x',
      value: tx.value ? utils.numberToHex(tx.value) : '0x',
      gas: utils.numberToHex(tx.gasLimit || tx.gas),
      gasPrice: utils.numberToHex(tx.gasPrice),
      chainId: utils.numberToHex(tx.chainId),
    };


    const hash = Hash.keccak256(Account.transactionSigningData(transaction));
    const rawTransaction = Account.signTransaction(transaction, privateKey);
    const values = RLP.decode(rawTransaction);
    const result = {
      messageHash: hash,
      v: values[6],
      r: values[7],
      s: values[8],
      rawTransaction,
    };
    if (_.isFunction(callback)) {
      callback(null, result);
    }
    return result;
  }

  // Returns synchronously if nonce, chainId and price are provided
  if (tx.nonce !== undefined && tx.chainId !== undefined && tx.gasPrice !== undefined) {
    return signed(tx);
  }


  // Otherwise, get the missing info from the Ethereum Node
  return Promise.all([
    isNot(tx.chainId) ? _this._ethereumCall.getId() : tx.chainId,
    isNot(tx.gasPrice) ? _this._ethereumCall.getGasPrice() : tx.gasPrice,
    isNot(tx.nonce) ? _this._ethereumCall.getTransactionCount(_this.privateKeyToAccount(privateKey).address) : tx.nonce,
  ]).then((args) => {
    if (isNot(args[0]) || isNot(args[1]) || isNot(args[2])) {
      throw new Error(`One of the values "chainId", "gasPrice", or "nonce" couldn't be fetched: ${JSON.stringify(args)}`);
    }
    return signed(_.extend(tx, { chainId: args[0], gasPrice: args[1], nonce: args[2] }));
  });
};

Accounts.prototype.recoverTransaction = function recoverTransaction (rawTx) {
  return Account.recoverTransaction(rawTx);
};

Accounts.prototype.hashMessage = function hashMessage (data) {
  const message = utils.isHex(data) ? utils.hexToUtf8(data) : data;
  const ethMessage = `\x19Ethereum Signed Message:\n${message.length}${message}`;
  return Hash.keccak256s(ethMessage);
};

Accounts.prototype.sign = function sign (data, privateKey) {
  const hash = this.hashMessage(data);
  const signature = Account.sign(hash, privateKey);
  const vrs = Account.decodeSignature(signature);
  return {
    message: data,
    v: vrs[0],
    r: vrs[1],
    s: vrs[2],
    signature,
  };
};

Accounts.prototype.recover = function recover (hash, signature) {
  if (_.isObject(hash)) {
    return this.recover(hash.messageHash, Account.encodeSignature([hash.v, hash.r, hash.s]));
  }

  if (!utils.isHex(hash)) {
    hash = this.hashMessage(hash);
  }

  if (arguments.length === 4) {
    return this.recover(hash, Account.encodeSignature([].slice.call(arguments, 1, 4))); // v, r, s
  }
  return Account.recover(hash, signature);
};

// Taken from https://github.com/ethereumjs/ethereumjs-wallet
Accounts.prototype.decrypt = function (v3Keystore, password, nonStrict) {
  /* jshint maxcomplexity: 10 */

  if (!_.isString(password)) {
    throw new Error('No password given.');
  }

  const json = (_.isObject(v3Keystore)) ? v3Keystore : JSON.parse(nonStrict ? v3Keystore.toLowerCase() : v3Keystore);

  if (json.version !== 3) {
    throw new Error('Not a valid V3 wallet');
  }

  let derivedKey;
  let kdfparams;
  if (json.crypto.kdf === 'scrypt') {
    kdfparams = json.crypto.kdfparams;

    // FIXME: support progress reporting callback
    derivedKey = scryptsy(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
  } else if (json.crypto.kdf === 'pbkdf2') {
    kdfparams = json.crypto.kdfparams;

    if (kdfparams.prf !== 'hmac-sha256') {
      throw new Error('Unsupported parameters to PBKDF2');
    }

    derivedKey = crypto.pbkdf2Sync(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
  } else {
    throw new Error('Unsupported key derivation scheme');
  }

  const ciphertext = new Buffer(json.crypto.ciphertext, 'hex');

  const mac = utils.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext])).replace('0x', '');
  if (mac !== json.crypto.mac) {
    throw new Error('Key derivation failed - possibly wrong password');
  }

  const decipher = crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), new Buffer(json.crypto.cipherparams.iv, 'hex'));
  const seed = `0x${Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('hex')}`;

  return this.privateKeyToAccount(seed);
};

Accounts.prototype.encrypt = function (privateKey, password, options) {
  /* jshint maxcomplexity: 20 */
  const account = this.privateKeyToAccount(privateKey);

  options = options || {};
  const salt = options.salt || crypto.randomBytes(32);
  const iv = options.iv || crypto.randomBytes(16);

  let derivedKey;
  const kdf = options.kdf || 'scrypt';
  const kdfparams = {
    dklen: options.dklen || 32,
    salt: salt.toString('hex'),
  };

  if (kdf === 'pbkdf2') {
    kdfparams.c = options.c || 262144;
    kdfparams.prf = 'hmac-sha256';
    derivedKey = crypto.pbkdf2Sync(new Buffer(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
  } else if (kdf === 'scrypt') {
    // FIXME: support progress reporting callback
    kdfparams.n = options.n || 8192; // 2048 4096 8192 16384
    kdfparams.r = options.r || 8;
    kdfparams.p = options.p || 1;
    derivedKey = scryptsy(new Buffer(password), salt, kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
  } else {
    throw new Error('Unsupported kdf');
  }

  const cipher = crypto.createCipheriv(options.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), iv);
  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  const ciphertext = Buffer.concat([cipher.update(new Buffer(account.privateKey.replace('0x', ''), 'hex')), cipher.final()]);

  const mac = utils.sha3(Buffer.concat([derivedKey.slice(16, 32), new Buffer(ciphertext, 'hex')])).replace('0x', '');

  return {
    version: 3,
    id: uuidv4({ random: options.uuid || crypto.randomBytes(16) }),
    address: account.address.toLowerCase().replace('0x', ''),
    crypto: {
      ciphertext: ciphertext.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex'),
      },
      cipher: options.cipher || 'aes-128-ctr',
      kdf,
      kdfparams,
      mac: mac.toString('hex'),
    },
  };
};


// Note: this is trying to follow closely the specs on
// http://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html

function Wallet (accounts) {
  this.length = 0;
  this._accounts = accounts;
  this.defaultKeyName = 'web3js_wallet';
}

Wallet.prototype.create = function (numberOfAccounts, entropy) {
  for (let i = 0; i < numberOfAccounts; ++i) {
    this.add(this._accounts.create(entropy).privateKey);
  }
  return this;
};

Wallet.prototype.add = function (account) {
  if (_.isString(account)) {
    account = this._accounts.privateKeyToAccount(account);
  }
  if (!this[account.address]) {
    account = this._accounts.privateKeyToAccount(account.privateKey);
    account.index = this.length;

    this[this.length] = account;
    this[account.address] = account;
    this[account.address.toLowerCase()] = account;

    this.length++;

    return account;
  }
  return this[account.address];
};

Wallet.prototype.remove = function (addressOrIndex) {
  const account = this[addressOrIndex];

  if (account) {
    // address
    this[account.address].privateKey = null;
    delete this[account.address];
    // address lowercase
    this[account.address.toLowerCase()].privateKey = null;
    delete this[account.address.toLowerCase()];
    // index
    this[account.index].privateKey = null;
    delete this[account.index];

    this.length--;

    return true;
  }
  return false;
};

Wallet.prototype.clear = function () {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    this.remove(i);
  }

  return this;
};

Wallet.prototype.encrypt = function (password, options) {
  const accounts = [];
  for (let i = 0; i < this.length; i++) {
    accounts[i] = this[i].encrypt(password, options);
  }
  return accounts;
};


Wallet.prototype.decrypt = function (encryptedWallet, password) {
  const _this = this;

  encryptedWallet.forEach((keystore) => {
    const account = _this._accounts.decrypt(keystore, password);

    if (account) {
      _this.add(account);
    } else {
      throw new Error('Couldn\'t decrypt accounts. Password wrong?');
    }
  });

  return this;
};

Wallet.prototype.save = function (password, keyName) {
  localStorage.setItem(keyName || this.defaultKeyName, JSON.stringify(this.encrypt(password)));

  return true;
};

Wallet.prototype.load = function (password, keyName) {
  let keystore = localStorage.getItem(keyName || this.defaultKeyName);

  if (keystore) {
    try {
      keystore = JSON.parse(keystore);
    } catch (e) {

    }
  }

  return this.decrypt(keystore || [], password);
};

if (typeof localStorage === 'undefined') {
  delete Wallet.prototype.save;
  delete Wallet.prototype.load;
}

export default Accounts;
