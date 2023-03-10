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
import { ContractExecutionError, Eip838ExecutionError, InvalidResponseError } from 'web3-errors';
import { decodeContractErrorData, isAbiErrorFragment } from 'web3-eth-abi';
import { AbiErrorFragment, ContractAbi, EthExecutionAPI, TransactionCall } from 'web3-types';
import { DataFormat, DEFAULT_RETURN_FORMAT } from 'web3-utils';

// eslint-disable-next-line import/no-cycle
import { call } from '../rpc_method_wrappers';
import { RevertReason, RevertReasonWithCustomError } from '../types';

export const parseTransactionError = (error: unknown, contractAbi?: ContractAbi) => {
	if (
		error instanceof ContractExecutionError &&
		error.innerError instanceof Eip838ExecutionError
	) {
		if (contractAbi !== undefined) {
			const errorsAbi = contractAbi.filter(abi =>
				isAbiErrorFragment(abi),
			) as unknown as AbiErrorFragment[];
			decodeContractErrorData(errorsAbi, error.innerError);

			return {
				reason: error.innerError.message,
				signature: error.innerError.data?.slice(0, 10),
				data: error.innerError.data?.substring(10),
				customErrorName: error.innerError.errorName,
				customErrorDecodedSignature: error.innerError.errorSignature,
				customErrorArguments: error.innerError.errorArgs,
			} as RevertReasonWithCustomError;
		}

		return {
			reason: error.innerError.message,
			signature: error.innerError.data?.slice(0, 10),
			data: error.innerError.data?.substring(10),
		} as RevertReason;
	}

	if (
		error instanceof InvalidResponseError &&
		!Array.isArray(error.innerError) &&
		error.innerError !== undefined
	) {
		return error.innerError.message;
	}

	throw error;
};

/**
 *	Returns the revert reason generated by the EVM if the transaction were to be executed.
 *
 * @param web3Context - ({@link Web3Context}) Web3 configuration object that contains things such as the provider, request manager, wallet, etc.
 * @param transaction - A transaction object where all properties are optional except `to`, however it's recommended to include the `from` property or it may default to `0x0000000000000000000000000000000000000000` depending on your node or provider.
 * @returns `undefined` if no revert reason was given, a revert reason object, a revert reason string, or an `unknown` error
 */
export async function getRevertReason<
	ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT,
>(
	web3Context: Web3Context<EthExecutionAPI>,
	transaction: TransactionCall,
	contractAbi?: ContractAbi,
	returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
): Promise<undefined | RevertReason | RevertReasonWithCustomError | string> {
	try {
		await call(web3Context, transaction, web3Context.defaultBlock, returnFormat);
		return undefined;
	} catch (error) {
		return parseTransactionError(error, contractAbi);
	}
}
