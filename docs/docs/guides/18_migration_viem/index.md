---
sidebar_label: '🔄 Migration to Viem'
title: 'Migration from Web3.js to Viem'
position: 18
---

# Migration from Web3.js to Viem

This guide will help you migrate from Web3.js v4 to Viem v2 for interacting with the Ethereum blockchain. The guide provides code examples for both libraries for transition.

## Installation

To begin migrating from Web3.js to Viem, first install the Viem package:

```bash
npm install viem@2
```

## Providers

When migrating from Web3.js to Viem, the first step is to update how you connect to the Ethereum network. Both libraries use providers, but their initialization differs.

```javascript
import Web3 from 'web3';

const web3 = new Web3(providerURL);
```

To migrate this to Viem, you'll need to replace it with using `createPublicClient()`. This function creates a client for interacting with the Ethereum network.

```javascript
import { createPublicClient, http } from 'viem';

const client = createPublicClient({ transport: http(providerURL) });
const blockNumber = await client.getBlockNumber();
```

## Browser-injected Provider

For browser wallet connections like MetaMask, update how you handle the injected provider.

```javascript
const web3 = new Web3(window.ethereum);
```

To migrate this to Viem, you'll need to use `createWalletClient()` with `custom()` instead of creating a new Web3 instance.

```javascript
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!)
})
```

## Wallets and Accounts - Generate Private Key

If your code generates private keys, here’s how to migrate that functionality. In web3.js if you are using:

```javascript
const privateKey = web3.eth.accounts.create().privateKey;
console.log(privateKey);
```

To migrate this to Viem, you'll use the `generatePrivateKey()` function from the 'viem/accounts' module.

```javascript
import { generatePrivateKey } from 'viem/accounts';

const privateKey = generatePrivateKey();
console.log(privateKey);
```

## Wallets and Accounts - Create a Wallet

When migrating from Web3.js to Viem, you'll need to update how you create and manage wallets. The process of adding accounts to wallets differs between the two libraries. In web3.js :

```javascript
const web3 = new Web3();
const wallet = web3.eth.accounts.wallet.add(privateKey);
console.log(wallet[0].address);
```

To migrate this to Viem, you'll use privateKeyToAccount() to create an account, and then can pass it to createWalletClient() for using it with client.

```javascript
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const account = privateKeyToAccount(privateKey);

const client = createWalletClient({
	account,
	chain: mainnet,
	transport: http(),
});
```

## Signing Messages

Update how you handle message signing, following is web3.js example:

```javascript
const signature = web3.eth.accounts.sign('Some data', privateKey).signature;
console.log(signature);
```

To sign message using Viem, you can use `signMessage()` method.

```javascript
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});

export const [account] = await walletClient.getAddresses();

const signature = await walletClient.signMessage({
  account,
  message: 'Some data',
});

```

## Transaction

When migrating transaction sending code, you'll need to update how transactions are signed and sent.

```javascript
const tx = await web3.eth.sendTransaction({
	from: account,
	to: '0x92d3267215Ec56542b985473E73C8417403B15ac',
	value: web3.utils.toWei('0.001', 'ether'),
});
```

In Viem there is `sendTransaction()` function avalible with sendTransaction.

```javascript
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});

export const [account] = await walletClient.getAddresses();

const hash = await sendTransaction.sendTransaction({
  account,
  to: '0x92d3267215Ec56542b985473E73C8417403B15ac',
  value: 100000000000000n
});

```

## Contracts

### Contract Deployment

When migrating contract deployment code, you'll need to update from Web3.js's deploy and send pattern:

```javascript
// use existing web3 instance connected with http provider
const contract = new web3.eth.Contract(abi);
const deployTx = await contract
	.deploy({
		data: bytecode,
		arguments: ['constructor param'],
	})
	.send({
		from: account,
		gas: '1000000',
	});
console.log(deployTx.options.address);
```

In Viem there is `deployContract()` function that can be used for contracts deployment.

```javascript
//import { deployContract } from 'viem'
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

export const walletClient = createWalletClient({
	chain: mainnet,
	transport: custom(window.ethereum),
});

const hash = await walletClient.deployContract({
	abi,
	account, //given account
	args: [69420],
	bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
});
```

### Contract Method Calls

When migrating contract method calls, you'll need to update from Web3.js's `contract.methods.someFunction().call()`

```javascript
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
const result = await contract.methods.someFunction().call();
console.log(result);
```

In Viem you you can use `readContract()` function

```javascript
const data = await publicClient.readContract({
	address: '0x92d3267215Ec56542b985473E73C8417403B15ac',
	abi: wagmiAbi,
	functionName: 'tokenTotalSupply',
});
```

### Contract Events

When migrating event handling code, you'll need to update from Web3.js's events interface:

```javascript
const event = contract.events.SomeEvent({ fromBlock: 0 });
event.on('data', resolve);
event.on('error', reject);
```

In Viem there is `watchContractEvent()` function.

```javascript
const unwatch = publicClient.watchContractEvent({
	address: '0x92d3267215Ec56542b985473E73C8417403B15ac',
	abi: wagmiAbi,
	eventName: 'Transfer',
	args: { from: '0x34d3267215Ec56542b985473E73C8417403B1533' },
	onLogs: logs => func(logs),
});
```

## Utility Methods

### Hashing

When migrating code that computes Keccak-256 hashes, you'll need to update from Web3.js's utility methods:

```
// keccak256 method with broader input support in web3.js
const hash = web3.utils.keccak256('hello world');
```

In Viem there is `keccak256()` function for keccak256.

```
import { keccak256 } from 'viem'

keccak256(toHex('hello world'));
```
