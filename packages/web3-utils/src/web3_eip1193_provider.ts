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

import {
	EthExecutionAPI,
	HexString,
	ProviderConnectInfo,
	Web3APIMethod,
	Web3APIPayload,
	Web3APISpec,
	Web3BaseProvider,
} from 'web3-types';
import { EventEmitter } from 'eventemitter3';
import { EIP1193ProviderRpcError } from 'web3-errors';
import { toPayload } from './json_rpc.js';

/**
 * This is an abstract class extending {@link Web3BaseProvider} that implements an Ethereum provider
 * adhering to the EIP-1193(https://eips.ethereum.org/EIPS/eip-1193) standard. It provides methods to interact with the blockchain, handle events,
 * and manage state like chain ID and accounts.
 */
export abstract class Eip1193Provider<
	API extends Web3APISpec = EthExecutionAPI,
> extends Web3BaseProvider<API> {
	/**
	 * An event emitter for managing and dispatching events like `connect`, `disconnect`, `chainChanged`, and `accountsChanged`.
	 */
	protected readonly _eventEmitter: EventEmitter = new EventEmitter();

	/**
	 * The current chain ID associated with the provider.
	 */
	private _chainId: HexString = '';

	/**
	 * The list of accounts currently connected to the provider.
	 */
	private _accounts: HexString[] = [];

	/**
	 * Fetches the current chain ID by sending an `eth_chainId` JSON-RPC request.
	 * @returns A Promise resolving to the chain ID as a hex string.
	 */
	private async _getChainId(): Promise<HexString> {
		const data = await (this as Web3BaseProvider<API>).request<
			Web3APIMethod<API>,
			ResponseType
		>(
			toPayload({
				method: 'eth_chainId',
				params: [],
			}) as Web3APIPayload<API, Web3APIMethod<API>>,
		);
		return data?.result ?? '';
	}

	/**
	 * Fetches the list of accounts currently connected by sending an `eth_accounts` JSON-RPC request.
	 * @returns A Promise resolving to an array of account addresses as hex strings.
	 */
	private async _getAccounts(): Promise<HexString[]> {
		const data = await (this as Web3BaseProvider<API>).request<Web3APIMethod<API>, HexString[]>(
			toPayload({
				method: 'eth_accounts',
				params: [],
			}) as Web3APIPayload<API, Web3APIMethod<API>>,
		);
		return data?.result ?? [];
	}

    /**
	 * Handles the `connect` event by fetching the chain ID and accounts, emitting relevant events if they change.
	 * This is triggered when the provider establishes a connection to the Ethereum network.
	 */
	protected _onConnect() {
		Promise.all([
			this._getChainId()
				.then(chainId => {
					if (chainId !== this._chainId) {
						this._chainId = chainId;
						this._eventEmitter.emit('chainChanged', this._chainId);
					}
				})
				.catch(err => {
					// todo: add error handler
					console.error(err);
				}),

			this._getAccounts()
				.then(accounts => {
					if (
						!(
							this._accounts.length === accounts.length &&
							accounts.every(v => accounts.includes(v))
						)
					) {
						this._accounts = accounts;
						this._onAccountsChanged();
					}
				})
				.catch(err => {
					// todo: add error handler
					// eslint-disable-next-line no-console
					console.error(err);
				}),
		])
			.then(() =>
				this._eventEmitter.emit('connect', {
					chainId: this._chainId,
				} as ProviderConnectInfo),
			)
			.catch(err => {
				// todo: add error handler
				// eslint-disable-next-line no-console
				console.error(err);
			});
	}

    /**
	 * Handles the `disconnect` event by emitting a `disconnect` event with the appropriate error code and message.
     * todo: this must be ProvideRpcError with a message too
	 * @param code - The error code associated with the disconnection.
	 * @param data - Optional additional data for the disconnection event.
	 */
	protected _onDisconnect(code: number, data?: unknown) {
		this._eventEmitter.emit('disconnect', new EIP1193ProviderRpcError(code, data));
	}

    /**
	 * Handles the `accountsChanged` event by emitting the updated accounts.
	 * This is triggered whenever the list of accounts changes.
	 */
	private _onAccountsChanged() {
		// get chainId and safe to local
		this._eventEmitter.emit('accountsChanged', this._accounts);
	}
}
