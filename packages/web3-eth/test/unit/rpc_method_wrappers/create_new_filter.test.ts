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
import { Web3Context } from 'web3-core';
import { DEFAULT_RETURN_FORMAT, FilterParams, Web3EthExecutionAPI } from 'web3-types';
import { ethRpcMethods } from 'web3-rpc-methods';
import { createNewFilter } from '../../../src/filtering_rpc_method_wrappers';
import { blockParams } from './fixtures/new_filter_block_params';

jest.mock('web3-rpc-methods');

describe('createNewFilter', () => {
	let web3Context: Web3Context<Web3EthExecutionAPI>;

	beforeAll(() => {
		web3Context = new Web3Context();
	});

	it.each(blockParams)(
		'should call rpcMethods.newFilter with fromBlock %p and toBlock %p',
		async (actualParams, expectedParams) => {
			const [fromBlockParam, toBlockParam] = actualParams;
			const [expectedFromBlock, expectedToBlock] = expectedParams;

			const sampleFilterParams: FilterParams = {
				fromBlock: fromBlockParam,
				toBlock: toBlockParam,
				address: ['0x1234567890abcdef1234567890abcdef12345678'],
			};
			await createNewFilter(web3Context, sampleFilterParams, DEFAULT_RETURN_FORMAT);
			expect(ethRpcMethods.newFilter).toHaveBeenCalledWith(web3Context.requestManager, {
				...sampleFilterParams,
				fromBlock: expectedFromBlock,
				toBlock: expectedToBlock,
			});
		},
	);
});
