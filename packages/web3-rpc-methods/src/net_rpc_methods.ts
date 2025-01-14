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

import { Web3RequestManager } from 'web3-core';
import { Web3NetAPI } from 'web3-types';

/**
 * Fetches the network ID of the current Ethereum network.
 * This corresponds to the `net_version` RPC call.
 * @param requestManager - An instance of `Web3RequestManager` to send the RPC request.
 * @returns A Promise that resolves to the network ID as a string.
 */
export async function getId(requestManager: Web3RequestManager<Web3NetAPI>) {
	return requestManager.send({
		method: 'net_version',
		params: [],
	});
}

/**
 * Fetches the number of connected peers to the Ethereum network.
 * This corresponds to the `net_peerCount` RPC call.
 * @param requestManager - An instance of `Web3RequestManager` to send the RPC request.
 * @returns A Promise that resolves to the peer count as a hexadecimal string.
 */
export async function getPeerCount(requestManager: Web3RequestManager<Web3NetAPI>) {
	return requestManager.send({
		method: 'net_peerCount',
		params: [],
	});
}

/**
 * Checks if the Ethereum client is currently listening for network connections.
 * This corresponds to the `net_listening` RPC call.
 * @param requestManager - An instance of `Web3RequestManager` to send the RPC request.
 * @returns A Promise that resolves to a boolean indicating if the client is listening.
 */
export async function isListening(requestManager: Web3RequestManager<Web3NetAPI>) {
	return requestManager.send({
		method: 'net_listening',
		params: [],
	});
}

