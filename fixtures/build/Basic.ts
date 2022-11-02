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
export const BasicAbi = [
	{
		inputs: [
			{ internalType: 'uint256', name: '_val', type: 'uint256' },
			{ internalType: 'string', name: '_stringValue', type: 'string' },
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'string', name: 'str', type: 'string' },
			{ indexed: false, internalType: 'uint256', name: 'val', type: 'uint256' },
			{ indexed: false, internalType: 'bool', name: 'flag', type: 'bool' },
		],
		name: 'MultiValueEvent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'string', name: 'str', type: 'string' },
			{ indexed: true, internalType: 'uint256', name: 'val', type: 'uint256' },
			{ indexed: true, internalType: 'bool', name: 'flag', type: 'bool' },
		],
		name: 'MultiValueIndexedEvent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'string', name: 'str', type: 'string' }],
		name: 'StringEvent',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'string', name: 'str', type: 'string' },
			{ internalType: 'uint256', name: 'val', type: 'uint256' },
			{ internalType: 'bool', name: 'flag', type: 'bool' },
		],
		name: 'firesMultiValueEvent',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'string', name: 'str', type: 'string' },
			{ internalType: 'uint256', name: 'val', type: 'uint256' },
			{ internalType: 'bool', name: 'flag', type: 'bool' },
		],
		name: 'firesMultiValueIndexedEvent',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'string', name: '_str', type: 'string' }],
		name: 'firesStringEvent',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getBoolValue',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getIntValue',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getStringValue',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getValues',
		outputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'string', name: '', type: 'string' },
			{ internalType: 'bool', name: '', type: 'bool' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'requireWithReason',
		outputs: [],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [],
		name: 'requireWithoutReason',
		outputs: [],
		stateMutability: 'pure',
		type: 'function',
	},
	{ inputs: [], name: 'reverts', outputs: [], stateMutability: 'pure', type: 'function' },
	{
		inputs: [
			{ internalType: 'uint256', name: '_value', type: 'uint256' },
			{ internalType: 'string', name: '_stringValue', type: 'string' },
			{ internalType: 'bool', name: '_boolValue', type: 'bool' },
		],
		name: 'setValues',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as const;
export const BasicBytecode =
	'0x60806040523480156200001157600080fd5b50604051620012a4380380620012a4833981810160405281019062000037919062000226565b8160008190555080600190816200004f9190620004cd565b505050620005b4565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b62000081816200006c565b81146200008d57600080fd5b50565b600081519050620000a18162000076565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000fc82620000b1565b810181811067ffffffffffffffff821117156200011e576200011d620000c2565b5b80604052505050565b60006200013362000058565b9050620001418282620000f1565b919050565b600067ffffffffffffffff821115620001645762000163620000c2565b5b6200016f82620000b1565b9050602081019050919050565b60005b838110156200019c5780820151818401526020810190506200017f565b60008484015250505050565b6000620001bf620001b98462000146565b62000127565b905082815260208101848484011115620001de57620001dd620000ac565b5b620001eb8482856200017c565b509392505050565b600082601f8301126200020b576200020a620000a7565b5b81516200021d848260208601620001a8565b91505092915050565b6000806040838503121562000240576200023f62000062565b5b6000620002508582860162000090565b925050602083015167ffffffffffffffff81111562000274576200027362000067565b5b6200028285828601620001f3565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002df57607f821691505b602082108103620002f557620002f462000297565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200035f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000320565b6200036b868362000320565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620003ae620003a8620003a2846200006c565b62000383565b6200006c565b9050919050565b6000819050919050565b620003ca836200038d565b620003e2620003d982620003b5565b8484546200032d565b825550505050565b600090565b620003f9620003ea565b62000406818484620003bf565b505050565b5b818110156200042e5762000422600082620003ef565b6001810190506200040c565b5050565b601f8211156200047d576200044781620002fb565b620004528462000310565b8101602085101562000462578190505b6200047a620004718562000310565b8301826200040b565b50505b505050565b600082821c905092915050565b6000620004a26000198460080262000482565b1980831691505092915050565b6000620004bd83836200048f565b9150826002028217905092915050565b620004d8826200028c565b67ffffffffffffffff811115620004f457620004f3620000c2565b5b620005008254620002c6565b6200050d82828562000432565b600060209050601f83116001811462000545576000841562000530578287015190505b6200053c8582620004af565b865550620005ac565b601f1984166200055586620002fb565b60005b828110156200057f5784890151825560018201915060208501945060208101905062000558565b868310156200059f57848901516200059b601f8916826200048f565b8355505b6001600288020188555050505b505050505050565b610ce080620005c46000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063844d6a3211610071578063844d6a3214610130578063939d7c4e1461013a578063ae012ede14610156578063b7a8238a14610160578063d7af8ac11461017c578063e8256ea014610198576100a9565b806319eb4a90146100ae5780632bfc4c69146100ce5780633bccbbc9146100ec5780635a018657146100f6578063828909bd14610112575b600080fd5b6100b66101b6565b6040516100c593929190610558565b60405180910390f35b6100d6610267565b6040516100e39190610596565b60405180910390f35b6100f46102f9565b005b610110600480360381019061010b9190610759565b610334565b005b61011a610374565b60405161012791906107c8565b60405180910390f35b61013861037d565b005b610154600480360381019061014f9190610759565b6103c0565b005b61015e610400565b005b61017a600480360381019061017591906107e3565b61040d565b005b6101966004803603810190610191919061082c565b610447565b005b6101a061047d565b6040516101ad919061089b565b60405180910390f35b60006060600080546001600260009054906101000a900460ff168180546101dc906108e5565b80601f0160208091040260200160405190810160405280929190818152602001828054610208906108e5565b80156102555780601f1061022a57610100808354040283529160200191610255565b820191906000526020600020905b81548152906001019060200180831161023857829003601f168201915b50505050509150925092509250909192565b606060018054610276906108e5565b80601f01602080910402602001604051908101604052809291908181526020018280546102a2906108e5565b80156102ef5780601f106102c4576101008083540402835291602001916102ef565b820191906000526020600020905b8154815290600101906020018083116102d257829003601f168201915b5050505050905090565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032b90610962565b60405180910390fd5b7fa8297798732ff8a80a23cf22707934835a9d5b03536598708f7414646a1b95b383838360405161036793929190610982565b60405180910390a1505050565b60008054905090565b60006103be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b590610a0c565b60405180910390fd5b565b801515827f553c4a49a36d26504ba0880f2f9bfe9ac7db4b81a893bde296546cd96ae0b33c856040516103f39190610596565b60405180910390a3505050565b600061040b57600080fd5b565b7f617cf8a4400dd7963ed519ebe655a16e8da1282bb8fea36a21f634af912f54ab8160405161043c9190610596565b60405180910390a150565b82600081905550816001908161045d9190610bd8565b5080600260006101000a81548160ff021916908315150217905550505050565b6000600260009054906101000a900460ff16905090565b6000819050919050565b6104a781610494565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156104e75780820151818401526020810190506104cc565b60008484015250505050565b6000601f19601f8301169050919050565b600061050f826104ad565b61051981856104b8565b93506105298185602086016104c9565b610532816104f3565b840191505092915050565b60008115159050919050565b6105528161053d565b82525050565b600060608201905061056d600083018661049e565b818103602083015261057f8185610504565b905061058e6040830184610549565b949350505050565b600060208201905081810360008301526105b08184610504565b905092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61060e826104f3565b810181811067ffffffffffffffff8211171561062d5761062c6105d6565b5b80604052505050565b60006106406105b8565b905061064c8282610605565b919050565b600067ffffffffffffffff82111561066c5761066b6105d6565b5b610675826104f3565b9050602081019050919050565b82818337600083830152505050565b60006106a461069f84610651565b610636565b9050828152602081018484840111156106c0576106bf6105d1565b5b6106cb848285610682565b509392505050565b600082601f8301126106e8576106e76105cc565b5b81356106f8848260208601610691565b91505092915050565b61070a81610494565b811461071557600080fd5b50565b60008135905061072781610701565b92915050565b6107368161053d565b811461074157600080fd5b50565b6000813590506107538161072d565b92915050565b600080600060608486031215610772576107716105c2565b5b600084013567ffffffffffffffff8111156107905761078f6105c7565b5b61079c868287016106d3565b93505060206107ad86828701610718565b92505060406107be86828701610744565b9150509250925092565b60006020820190506107dd600083018461049e565b92915050565b6000602082840312156107f9576107f86105c2565b5b600082013567ffffffffffffffff811115610817576108166105c7565b5b610823848285016106d3565b91505092915050565b600080600060608486031215610845576108446105c2565b5b600061085386828701610718565b935050602084013567ffffffffffffffff811115610874576108736105c7565b5b610880868287016106d3565b925050604061089186828701610744565b9150509250925092565b60006020820190506108b06000830184610549565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806108fd57607f821691505b6020821081036109105761090f6108b6565b5b50919050565b7f5245564552544544205749544820524556455254000000000000000000000000600082015250565b600061094c6014836104b8565b915061095782610916565b602082019050919050565b6000602082019050818103600083015261097b8161093f565b9050919050565b6000606082019050818103600083015261099c8186610504565b90506109ab602083018561049e565b6109b86040830184610549565b949350505050565b7f5245564552544544205749544820524551554952450000000000000000000000600082015250565b60006109f66015836104b8565b9150610a01826109c0565b602082019050919050565b60006020820190508181036000830152610a25816109e9565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610a8e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610a51565b610a988683610a51565b95508019841693508086168417925050509392505050565b6000819050919050565b6000610ad5610ad0610acb84610494565b610ab0565b610494565b9050919050565b6000819050919050565b610aef83610aba565b610b03610afb82610adc565b848454610a5e565b825550505050565b600090565b610b18610b0b565b610b23818484610ae6565b505050565b5b81811015610b4757610b3c600082610b10565b600181019050610b29565b5050565b601f821115610b8c57610b5d81610a2c565b610b6684610a41565b81016020851015610b75578190505b610b89610b8185610a41565b830182610b28565b50505b505050565b600082821c905092915050565b6000610baf60001984600802610b91565b1980831691505092915050565b6000610bc88383610b9e565b9150826002028217905092915050565b610be1826104ad565b67ffffffffffffffff811115610bfa57610bf96105d6565b5b610c0482546108e5565b610c0f828285610b4b565b600060209050601f831160018114610c425760008415610c30578287015190505b610c3a8582610bbc565b865550610ca2565b601f198416610c5086610a2c565b60005b82811015610c7857848901518255600182019150602085019450602081019050610c53565b86831015610c955784890151610c91601f891682610b9e565b8355505b6001600288020188555050505b50505050505056fea26469706673582212200b9ded6251f5065202c6109ba133d2a5cb3f5ddaeca0b4190e23f1e80c13989264736f6c63430008100033';
