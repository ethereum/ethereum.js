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

import BN = require('bn.js');
import {Buffer} from 'buffer';

export type Unit =
    | 'drip'
    | 'gdrip'
    | 'Gdrip'
    | 'cfx';

export type Mixed =
    | string
    | number
    | BN
    | {
          type: string;
          value: string;
      }
    | {
          t: string;
          v: string | BN | number;
      }
    | boolean;

export type Hex = string | number;

// utils types
export function isBN(value: string | number): boolean;
export function isBigNumber(value: BN): boolean;
export function toBN(value: number | string): BN;
export function toTwosComplement(value: number | string | BN): string;
export function isAddress(address: string): boolean;
export function isHex(hex: Hex): boolean;
export function isHexStrict(hex: Hex): boolean;
export function asciiToHex(string: string, length?: number): string;
export function hexToAscii(string: string): string;
export function toAscii(string: string): string;
export function bytesToHex(bytes: number[]): string;
export function numberToHex(value: number | string | BN): string;
export function checkAddressChecksum(address: string): boolean;
export function fromAscii(string: string): string;
export function fromDecimal(value: string | number): string;
export function fromUtf8(string: string): string;
export function fromDrip(value: string | BN, unit?: Unit): string;
export function hexToBytes(hex: Hex): number[];
export function hexToNumber(hex: Hex): number;
export function hexToNumberString(hex: Hex): string;
export function hexToString(hex: Hex): string;
export function hexToUtf8(string: string): string;
export function keccak256(value: string | BN): string;
export function padLeft(value: string | number, characterAmount: number, sign?: string): string;
export function leftPad(string: string | number, characterAmount: number, sign?: string): string;
export function rightPad(string: string | number, characterAmount: number, sign?: string): string;
export function padRight(string: string | number, characterAmount: number, sign?: string): string;
export function sha3(value: string | BN): string;
export function randomHex(bytesSize: number): string;
export function utf8ToHex(string: string): string;
export function stringToHex(string: string): string;
export function toChecksumAddress(address: string): string;
export function toDecimal(hex: Hex): number;
export function toHex(value: number | string | BN): string;
export function toUtf8(string: string): string;
export function toDrip(val: BN, unit?: Unit): BN;
export function toDrip(val: string, unit?: Unit): string;
export function isBloom(bloom: string): boolean;
export function isTopic(topic: string): boolean;
export function jsonInterfaceMethodToString(abiItem: AbiItem): string;
export function soliditySha3(...val: Mixed[]): string;
export function getUnitValue(unit: Unit): string;
export function unitMap(): Units;
export function testAddress(bloom: string, address: string): boolean;
export function testTopic(bloom: string, topic: string): boolean;
export function getSignatureParameters(signature: string): {r: string; s: string; v: number};

// interfaces
export interface Utils {
    isBN(value: string | number): boolean;
    isBigNumber(value: BN): boolean;
    toBN(value: number | string): BN;
    toTwosComplement(value: number | string | BN): string;
    isAddress(address: string): boolean;
    isHex(hex: Hex): boolean;
    isHexStrict(hex: Hex): boolean;
    asciiToHex(string: string, length?: number): string;
    hexToAscii(string: string): string;
    toAscii(string: string): string;
    bytesToHex(bytes: number[]): string;
    numberToHex(value: number | string | BN): string;
    checkAddressChecksum(address: string): boolean;
    fromAscii(string: string): string;
    fromDecimal(value: string | number): string;
    fromUtf8(string: string): string;
    fromDrip(value: string | BN, unit?: Unit): string;
    hexToBytes(hex: Hex): number[];
    hexToNumber(hex: Hex): number;
    hexToNumberString(hex: Hex): string;
    hexToString(hex: Hex): string;
    hexToUtf8(string: string): string;
    keccak256(value: string | BN): string;
    padLeft(value: string | number, characterAmount: number, sign?: string): string;
    leftPad(string: string | number, characterAmount: number, sign?: string): string;
    rightPad(string: string | number, characterAmount: number, sign?: string): string;
    padRight(string: string | number, characterAmount: number, sign?: string): string;
    sha3(value: string | BN): string;
    randomHex(bytesSize: number): string;
    utf8ToHex(string: string): string;
    stringToHex(string: string): string;
    toChecksumAddress(address: string): string;
    toDecimal(hex: Hex): number;
    toHex(value: number | string | BN): string;
    toUtf8(string: string): string;
    toDrip(val: BN, unit?: Unit): BN;
    toDrip(val: string, unit?: Unit): string;
    isBloom(bloom: string): boolean;
    isTopic(topic: string): boolean;
    jsonInterfaceMethodToString(abiItem: AbiItem): string;
    soliditySha3(...val: Mixed[]): string;
    getUnitValue(unit: Unit): string;
    unitMap(): Units;
    testAddress(bloom: string, address: string): boolean;
    testTopic(bloom: string, topic: string): boolean;
    getSignatureParameters(signature: string): {r: string; s: string; v: number};
}

export interface Units {
    drip: string;
    gdrip: string;
    Gdrip: string;
    cfx: string;
}

export type AbiType = 'function' | 'constructor' | 'event' | 'fallback';
export type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable';

export interface AbiItem {
    anonymous?: boolean;
    constant?: boolean;
    inputs?: AbiInput[];
    name?: string;
    outputs?: AbiOutput[];
    payable?: boolean;
    stateMutability?: StateMutabilityType;
    type: AbiType;
}

export interface AbiInput {
    name: string;
    type: string;
    indexed?: boolean;
	components?: AbiInput[];
}

export interface AbiOutput {
    name: string;
    type: string;
	components?: AbiOutput[];
}
