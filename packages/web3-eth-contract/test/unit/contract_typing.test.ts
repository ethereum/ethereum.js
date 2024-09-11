﻿/*
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

/* eslint-disable jest/expect-expect */

import { expectTypeOf, typecheck } from '@humeris/espresso-shot';
import { ContractConstructorArgs, Numbers } from 'web3-types';
import { Contract } from '../../src/contract';
import { erc20Abi, Erc20Interface } from '../fixtures/erc20';
import { erc721Abi, Erc721Interface } from '../fixtures/erc721';
import { NonPayableMethodObject, PayableMethodObject } from '../../src';

describe('contract typing', () => {
	describe('no abi type', () => {
		const defaultContractInstance = new Contract([]);
		// when using new web3.eth.Contract generic is any[] instead of never
		const web3ContractInstance = new Contract<any[]>([]);

		typecheck('should allow any contract init params', () => [
			expectTypeOf<ContractConstructorArgs<any[]>>().not.toBe<[]>(),
			expectTypeOf<ContractConstructorArgs<never>>().not.toBe<[]>(),
			expectTypeOf<ContractConstructorArgs<[]>>().not.toBe<[]>(),
		]);

		typecheck('should allow any input params', () => [
			expectTypeOf<Parameters<typeof defaultContractInstance.methods.test>>().toBe<any[]>(),
			expectTypeOf<Parameters<typeof web3ContractInstance.methods.test>>().toBe<any[]>(),
		]);
	});
	describe('custom abi', () => {
		const abi = [
			{
				inputs: [
					{
						internalType: 'string',
						name: 'tokenId',
						type: 'string',
					},
				],
				name: 'tokenURI',
				outputs: [{ internalType: 'string', name: '', type: 'string' }],
				stateMutability: 'view',
				type: 'function',
			},
		] as const;
		const contractInstance = new Contract(abi);
		interface CustomInterface {
			methods: {
				[key: string]: (
					...args: ReadonlyArray<any>
				) =>
					| PayableMethodObject<ReadonlyArray<unknown>, ReadonlyArray<unknown>>
					| NonPayableMethodObject<ReadonlyArray<unknown>, ReadonlyArray<unknown>>;
				tokenURI: (tokenId: Numbers) => NonPayableMethodObject<[Numbers], [string]>;
			};
		}

		typecheck('should contain all methods', () =>
			expectTypeOf<keyof typeof contractInstance.methods>().toBe<
				keyof CustomInterface['methods']
			>(),
		);
	});
	describe('erc20', () => {
		const contract = new Contract(erc20Abi);

		typecheck('should contain all methods', () =>
			expectTypeOf<keyof typeof contract.methods>().toBe<keyof Erc20Interface['methods']>(),
		);

		typecheck('should have interface compliance methods', () =>
			expectTypeOf(contract.methods).toExtend<Erc20Interface['methods']>(),
		);

		typecheck('should have all events', () =>
			expectTypeOf<keyof typeof contract.events>().toBe<keyof Erc20Interface['events']>(),
		);

		typecheck('should have interface compliance events', () =>
			expectTypeOf(contract.events).toExtend<Erc20Interface['events']>(),
		);
	});

	describe('erc721', () => {
		const contract = new Contract(erc721Abi);

		typecheck('should contain all methods', () =>
			expectTypeOf<keyof typeof contract.methods>().toBe<keyof Erc721Interface['methods']>(),
		);

		// TODO: It's not matching types for `safeTransferFrom` because of overloaded method
		// typecheck('should have interface compliance methods', () =>
		// 	expectTypeOf(contract.methods).toExtend<Erc721Interface['methods']>(),
		// );

		typecheck('should have all events', () =>
			expectTypeOf<keyof typeof contract.events>().toBe<keyof Erc721Interface['events']>(),
		);

		typecheck('should have interface compliance events', () =>
			expectTypeOf(contract.events).toExtend<Erc721Interface['events']>(),
		);
	});
});
