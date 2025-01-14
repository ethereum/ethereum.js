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

import { ResolverMethodMissingError } from 'web3-errors';
import { Contract } from 'web3-eth-contract';
import { isNullish, sha3 } from 'web3-utils';
import { isHexStrict } from 'web3-validator';
import { Address, PayableCallOptions } from 'web3-types';
import { PublicResolverAbi } from './abi/ens/PublicResolver.js';
import { interfaceIds, methodsInInterface } from './config.js';
import { Registry } from './registry.js';
import { namehash } from './utils.js';

//  Default public resolver
//  https://github.com/ensdomains/resolvers/blob/master/contracts/PublicResolver.sol

export class Resolver {
	/**
	 * The ENS registry instance used to resolve ENS names.
	 */
	private readonly registry: Registry;

	/**
	 * Creates a new instance of the `Resolver` class.
	 * @param registry - An instance of the ENS `Registry`.
	 */
	public constructor(registry: Registry) {
		this.registry = registry;
	}

	/**
	 * Retrieves the resolver contract for the specified ENS name.
	 * @param ENSName - The ENS name to resolve.
	 * @returns A Promise that resolves to the resolver contract.
	 */
	private async getResolverContractAdapter(ENSName: string) {
		//  TODO : (Future 4.1.0 TDB) cache resolver contract if frequently queried same ENS name, refresh cache based on TTL and usage, also limit cache size, optional cache with a flag
		return this.registry.getResolver(ENSName);
	}

	/**
	 * Checks if a resolver contract supports a specific interface.
     * Relative EIP: https://eips.ethereum.org/EIPS/eip-165
	 * @param resolverContract - The resolver contract instance.
	 * @param methodName - The method name to check for interface support.
	 * @throws ResolverMethodMissingError if the interface is not supported.
	 */
	public async checkInterfaceSupport(
		resolverContract: Contract<typeof PublicResolverAbi>,
		methodName: string,
	) {
		if (isNullish(interfaceIds[methodName]))
			throw new ResolverMethodMissingError(
				resolverContract.options.address ?? '',
				methodName,
			);

		const supported = await resolverContract.methods
			.supportsInterface(interfaceIds[methodName])
			.call();

		if (!supported)
			throw new ResolverMethodMissingError(
				resolverContract.options.address ?? '',
				methodName,
			);
	}

	/**
	 * Checks if a resolver contract supports a specific interface by its ID.
	 * @param ENSName - The ENS name to resolve.
	 * @param interfaceId - The interface ID to check.
	 * @returns A Promise that resolves to a boolean indicating support.
	 */
	public async supportsInterface(ENSName: string, interfaceId: string) {
		const resolverContract = await this.getResolverContractAdapter(ENSName);

		let interfaceIdParam = interfaceId;

		if (!isHexStrict(interfaceIdParam)) {
			interfaceIdParam = sha3(interfaceId) ?? '';

			if (interfaceId === '') throw new Error('Invalid interface Id');

			interfaceIdParam = interfaceIdParam.slice(0, 10);
		}

		return resolverContract.methods.supportsInterface(interfaceIdParam).call();
	}

	/**
	 * Retrieves the address associated with an ENS name for a specific coin type.
	 * @param ENSName - The ENS name to resolve.
	 * @param coinType - The coin type (default is 60 for Ethereum).
	 * @returns A Promise that resolves to the address.
	 */
	public async getAddress(ENSName: string, coinType: number = 60) {
		const resolverContract = await this.getResolverContractAdapter(ENSName);

		await this.checkInterfaceSupport(resolverContract, methodsInInterface.addr);

		return resolverContract.methods.addr(namehash(ENSName), coinType).call();
	}

	/**
	 * Retrieves the public key associated with an ENS name.
	 * @param ENSName - The ENS name to resolve.
	 * @returns A Promise that resolves to the public key.
	 */
	public async getPubkey(ENSName: string) {
		const resolverContract = await this.getResolverContractAdapter(ENSName);

		await this.checkInterfaceSupport(resolverContract, methodsInInterface.pubkey);

		return resolverContract.methods.pubkey(namehash(ENSName)).call();
	}

	/**
	 * Retrieves the content hash associated with an ENS name.
	 * @param ENSName - The ENS name to resolve.
	 * @returns A Promise that resolves to the content hash.
	 */
	public async getContenthash(ENSName: string) {
		const resolverContract = await this.getResolverContractAdapter(ENSName);

		await this.checkInterfaceSupport(resolverContract, methodsInInterface.contenthash);

		return resolverContract.methods.contenthash(namehash(ENSName)).call();
	}

	/**
	 * Sets the address for an ENS name.
	 * @param ENSName - The ENS name to set the address for.
	 * @param address - The address to set.
	 * @param txConfig - The transaction configuration options.
	 * @returns A Promise that resolves when the transaction is complete.
	 */
	public async setAddress(ENSName: string, address: Address, txConfig: PayableCallOptions) {
		const resolverContract = await this.getResolverContractAdapter(ENSName);
		await this.checkInterfaceSupport(resolverContract, methodsInInterface.setAddr);

		return resolverContract.methods.setAddr(namehash(ENSName), address).send(txConfig);
	}

	/**
	 * Retrieves a text record for an ENS name.
	 * @param ENSName - The ENS name to resolve.
	 * @param key - The text record key.
	 * @returns A Promise that resolves to the text record value.
	 */
	public async getText(ENSName: string, key: string) {
		const resolverContract = await this.getResolverContractAdapter(ENSName);
		await this.checkInterfaceSupport(resolverContract, methodsInInterface.text);

		return resolverContract.methods.text(namehash(ENSName), key).call();
	}

	/**
	 * Retrieves the ENS name associated with an address.
	 * @param address - The address to resolve.
	 * @param checkInterfaceSupport - Whether to check for interface support (default: true).
	 * @returns A Promise that resolves to the ENS name.
	 */
	public async getName(address: string, checkInterfaceSupport = true) {
		const reverseName = `${address.toLowerCase().substring(2)}.addr.reverse`;

		const resolverContract = await this.getResolverContractAdapter(reverseName);

		if (checkInterfaceSupport)
			await this.checkInterfaceSupport(resolverContract, methodsInInterface.name);

		return resolverContract.methods.name(namehash(reverseName)).call();
	}
}

