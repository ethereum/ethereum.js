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

// Modified blockParams to include sub-arrays for actual and expected parameters
export const blockParams: [
	[string | number | bigint, string | number | bigint],
	[string, string],
][] = [
	[
		[123, 'latest'],
		['0x7b', 'latest'],
	], // Number fromBlock
	[
		[BigInt(123), 'latest'],
		['0x7b', 'latest'],
	], // BigInt fromBlock
	[
		['0x7b', 'latest'],
		['0x7b', 'latest'],
	], // Hexadecimal fromBlock
	[
		[123, 456],
		['0x7b', '0x1c8'],
	], // Number fromBlock and toBlock
	[
		[BigInt(123), BigInt(456)],
		['0x7b', '0x1c8'],
	], // BigInt fromBlock and toBlock
	[
		['0x7b', '0x1c8'],
		['0x7b', '0x1c8'],
	], // Hexadecimal fromBlock and toBlock
	[
		['latest', 123],
		['latest', '0x7b'],
	],
	[
		['latest', BigInt(123)],
		['latest', '0x7b'],
	],
	[
		['latest', '0x7b'],
		['latest', '0x7b'],
	],
];
