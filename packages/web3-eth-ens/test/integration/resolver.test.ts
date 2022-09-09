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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract, PayableTxOptions } from 'web3-eth-contract';
import { sha3, toChecksumAddress, DEFAULT_RETURN_FORMAT } from 'web3-utils';
import Web3Eth from 'web3-eth';

import { Address, Bytes, TransactionReceipt } from 'web3-types';
import { SendTransactionOptions } from 'web3-eth/src/types';
import { ENS } from '../../src';
import { namehash } from '../../src/utils';

import {
	getSystemTestAccounts,
	getSystemTestProvider,
	isWs,
	isIpc,
	closeOpenConnection,
} from '../fixtures/system_tests_utils';

import { ENSRegistryAbi } from '../../src/abi/ens/ENSRegistry';
import { ENSRegistryBytecode } from '../fixtures/ens/bytecode/ENSRegistryBytecode';
import { DummyNameWrapperApi } from '../../src/abi/ens/DummyNameWrapper';
import { DummyNameWrapperBytecode } from '../fixtures/ens/bytecode/DummyNameWrapperBytecode';
import { PublicResolverAbi } from '../../src/abi/ens/PublicResolver';
import { PublicResolverBytecode } from '../fixtures/ens/bytecode/PublicResolverBytecode';

describe('ens', () => {
	let registry: Contract<typeof ENSRegistryAbi>;
	let resolver: Contract<typeof PublicResolverAbi>;
	let nameWrapper: Contract<typeof DummyNameWrapperApi>;

	let Resolver: Contract<typeof PublicResolverAbi>;

	let sendOptions: PayableTxOptions;

	const domain = 'test';
	const domainNode = namehash(domain);
	const node = namehash('resolver');
	const label = sha3('resolver') as string;

	const subdomain = 'subdomain';
	const fullDomain = `${subdomain}.${domain}`;
	const web3jsName = 'web3js.test';

	const ttl = 3600;
	let web3Eth: Web3Eth;

	let accounts: string[];
	let ens: ENS;
	let defaultAccount: string;
	let accountOne: string;

	const ZERO_NODE: Bytes = '0x0000000000000000000000000000000000000000000000000000000000000000';
	const addressOne: Address = '0x0000000000000000000000000000000000000001';
	// let registryAddress: string;
	// let resolverAddress: string;

	beforeAll(async () => {
		accounts = await getSystemTestAccounts();

		[defaultAccount, accountOne] = accounts;

		sendOptions = { from: defaultAccount, gas: '10000000' };

		const Registry = new Contract(ENSRegistryAbi, undefined, {
			provider: getSystemTestProvider(),
		});

		const DummyNameWrapper = new Contract(DummyNameWrapperApi, undefined, {
			provider: getSystemTestProvider(),
		});

		Resolver = new Contract(PublicResolverAbi, undefined, {
			provider: getSystemTestProvider(),
		});

		registry = await Registry.deploy({ data: ENSRegistryBytecode }).send(sendOptions);

		nameWrapper = await DummyNameWrapper.deploy({ data: DummyNameWrapperBytecode }).send(
			sendOptions,
		);

		resolver = await Resolver.deploy({
			data: PublicResolverBytecode,
			arguments: [
				registry.options.address as string,
				nameWrapper.options.address as string,
				accountOne,
				defaultAccount,
			],
		}).send(sendOptions);

		await registry.methods.setSubnodeOwner(ZERO_NODE, label, defaultAccount).send(sendOptions);
		await registry.methods
			.setResolver(node, resolver.options.address as string)
			.send(sendOptions);
		await resolver.methods.setAddr(node, addressOne).send(sendOptions);

		await registry.methods
			.setSubnodeOwner(ZERO_NODE, sha3(domain) as string, defaultAccount)
			.send(sendOptions);

		const clientUrl = getSystemTestProvider();
		let provider;
		if (isIpc) provider = new ENS.providers.IpcProvider(clientUrl);
		else if (isWs) provider = new ENS.providers.WebsocketProvider(clientUrl);
		else provider = new ENS.providers.HttpProvider(clientUrl);

		ens = new ENS(registry.options.address, provider);

		web3Eth = new Web3Eth(provider);
		const block = await web3Eth.getBlock('latest', false, DEFAULT_RETURN_FORMAT);
		const gas = block.gasLimit.toString();

		// Increase gas for contract calls
		sendOptions = {
			...sendOptions,
			gas,
		};

		// resolverAddress = resolver.options.address as string;
		// registryAddress = registry.options.address as string;
	});

	afterAll(async () => {
		await closeOpenConnection(ens);
	});
	beforeEach(async () => {
		// set up subnode
		await registry.methods
			.setSubnodeOwner(ZERO_NODE, sha3('eth') as string, defaultAccount)
			.send(sendOptions);
	});

	// it('supports known interfaces', async () => {
	// 	await expect(ens.supportsInterface('resolver', '0x3b3b57de')).resolves.toBeTruthy(); // IAddrResolver
	// 	await expect(ens.supportsInterface('resolver', '0xf1cb7e06')).resolves.toBeTruthy(); // IAddressResolver
	// 	await expect(ens.supportsInterface('resolver', '0x691f3431')).resolves.toBeTruthy(); // INameResolver
	// 	await expect(ens.supportsInterface('resolver', '0x2203ab56')).resolves.toBeTruthy(); // IABIResolver
	// 	await expect(ens.supportsInterface('resolver', '0xc8690233')).resolves.toBeTruthy(); // IPubkeyResolver
	// 	await expect(ens.supportsInterface('resolver', '0x59d1d43c')).resolves.toBeTruthy(); // ITextResolver
	// 	await expect(ens.supportsInterface('resolver', '0xbc1c58d1')).resolves.toBeTruthy(); // IContentHashResolver
	// 	await expect(ens.supportsInterface('resolver', '0xa8fa5682')).resolves.toBeTruthy(); // IDNSRecordResolver
	// 	await expect(ens.supportsInterface('resolver', '0x5c98042b')).resolves.toBeTruthy(); // IDNSZoneResolver
	// 	await expect(ens.supportsInterface('resolver', '0x01ffc9a7')).resolves.toBeTruthy(); // IInterfaceResolver
	// });

	// it('does not support a random interface', async () => {
	// 	await expect(await ens.supportsInterface('resolver', '0x3b3b57df')).resolves.toBeFalsy();
	// });

	it('permits setting address by owner', async () => {
		await ens.setAddress(domain, accountOne, { from: defaultAccount }, DEFAULT_RETURN_FORMAT);
		// console.log((tx as TransactionReceipt).logs.length);
	});
});
