---
sidebar_label: '🔄 Migration to Viem'
title: 'Migration from Web3.js to Viem'
position: 18
---

# Migration from Web3.js to Viem

This guide will help you migrate from Web3.js to Viem for interacting with the Ethereum blockchain. The guide provides code examples for both libraries to ease the transition.

## Installation

To begin migrating from Web3.js to Viem, first install the Viem package:

```bash
npm install viem
```

## Providers Initialization

When migrating from Web3.js to Viem, the first step is updating how you connect to the Ethereum network. Both libraries use providers, but their initialization differs.

### Web3.js

```javascript
import Web3 from 'web3';

const web3 = new Web3(providerURL);
```

### Viem

```javascript
import { createPublicClient, http } from 'viem';

const client = createPublicClient({ transport: http(providerURL) });
const blockNumber = await client.getBlockNumber();
```

## Browser-injected Provider

For browser wallet connections like MetaMask, update how you handle the injected provider.

### Web3.js

```javascript
const web3 = new Web3(window.ethereum);
```

### Viem

```javascript
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!)
})
```

## Wallets and Accounts - Generate Private Key

If your code generates private keys, here’s how to migrate that functionality.

### Web3.js

```javascript
const privateKey = web3.eth.accounts.create().privateKey;
console.log(privateKey);
```

### Viem

```javascript
import { generatePrivateKey } from 'viem/accounts';

const privateKey = generatePrivateKey();
console.log(privateKey);
```

## Wallets and Accounts - Create a Wallet

Update how accounts are added to wallets.

### Web3.js

```javascript
const web3 = new Web3();
const wallet = web3.eth.accounts.wallet.add(privateKey);
console.log(wallet[0].address);
```

### Viem

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

Update how you handle message signing.

### Web3.js

```javascript
const signature = web3.eth.accounts.sign('Some data', privateKey).signature;
console.log(signature);
```

### Viem

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

### Web3.js

```javascript
const tx = await web3.eth.sendTransaction({
	from: account,
	to: '0x92d3267215Ec56542b985473E73C8417403B15ac',
	value: web3.utils.toWei('0.001', 'ether'),
});
```

### Viem

```javascript
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});

export const [account] = await walletClient.getAddresses();

const hash = await walletClient.sendTransaction({
  account,
  to: '0x92d3267215Ec56542b985473E73C8417403B15ac',
  value: 100000000000000n
});

```

## Contracts

### Contract Deployment

### Web3.js

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

### Viem

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

#### Web3.js

```javascript
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
const result = await contract.methods.someFunction().call();
console.log(result);
```

#### Viem

```javascript
const data = await publicClient.readContract({
	address: '0x92d3267215Ec56542b985473E73C8417403B15ac',
	abi: wagmiAbi,
	functionName: 'tokenTotalSupply',
});
```

### Contract Events

#### Web3.js

```javascript
const event = contract.events.SomeEvent({ fromBlock: 0 });
event.on('data', resolve);
event.on('error', reject);
```

#### Viem

```javascript
const unwatch = publicClient.watchContractEvent({
	address: '0x92d3267215Ec56542b985473E73C8417403B15ac',
	abi: wagmiAbi,
	eventName: 'Transfer',
	args: { from: '0x34d3267215Ec56542b985473E73C8417403B1533' },
	onLogs: logs => console.log(logs),
});
```

## Utility Methods

### Hashing

When migrating code that computes Keccak-256 hashes, you'll need to update from Web3.js's utility methods:

#### web3.js

```
// keccak256 method with broader input support in web3.js
const hash = web3.utils.keccak256('hello world');
```

#### viem

```
import { keccak256 } from 'viem'

keccak256(toHex('hello world'));
```
