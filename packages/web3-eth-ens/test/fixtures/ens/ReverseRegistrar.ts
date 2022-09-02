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
export const ReverseRegistrarAbi = [
	{
		inputs: [
			{
				internalType: 'contract ENS',
				name: 'ensAddr',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'controller',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'enabled',
				type: 'bool',
			},
		],
		name: 'ControllerChanged',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'addr',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'node',
				type: 'bytes32',
			},
		],
		name: 'ReverseClaimed',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
		],
		name: 'claim',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'addr',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'resolver',
				type: 'address',
			},
		],
		name: 'claimForAddr',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'resolver',
				type: 'address',
			},
		],
		name: 'claimWithResolver',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'controllers',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'defaultResolver',
		outputs: [
			{
				internalType: 'contract NameResolver',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'ens',
		outputs: [
			{
				internalType: 'contract ENS',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'addr',
				type: 'address',
			},
		],
		name: 'node',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'controller',
				type: 'address',
			},
			{
				internalType: 'bool',
				name: 'enabled',
				type: 'bool',
			},
		],
		name: 'setController',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'resolver',
				type: 'address',
			},
		],
		name: 'setDefaultResolver',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: 'name',
				type: 'string',
			},
		],
		name: 'setName',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'addr',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'resolver',
				type: 'address',
			},
			{
				internalType: 'string',
				name: 'name',
				type: 'string',
			},
		],
		name: 'setNameForAddr',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as const;
export const ReverseRegistarBytecode =
	'0x60a06040523480156200001157600080fd5b50604051620012d0380380620012d08339810160408190526200003491620001c4565b6200003f336200015b565b6001600160a01b03811660808190526040516302571be360e01b81527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e26004820152600091906302571be390602401602060405180830381865afa158015620000ac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000d29190620001c4565b90506001600160a01b038116156200015357604051630f41a04d60e11b81523360048201526001600160a01b03821690631e83409a906024016020604051808303816000875af11580156200012b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001519190620001eb565b505b505062000205565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620001c157600080fd5b50565b600060208284031215620001d757600080fd5b8151620001e481620001ab565b9392505050565b600060208284031215620001fe57600080fd5b5051919050565b6080516110a16200022f6000396000818161012d0152818161033e015261058901526110a16000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063c66485b211610066578063c66485b214610208578063da8c229e1461021b578063e0dba60f1461024e578063f2fde38b1461026157600080fd5b80638da5cb5b146101c4578063bffbe61c146101e2578063c47f0027146101f557600080fd5b806365669631116100c85780636566963114610174578063715018a6146101875780637a806d6b14610191578063828eab0e146101a457600080fd5b80630f5a5466146100ef5780631e83409a146101155780633f15457f14610128575b600080fd5b6101026100fd366004610d4d565b610274565b6040519081526020015b60405180910390f35b610102610123366004610d86565b610288565b61014f7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161010c565b610102610182366004610da3565b6102b7565b61018f6105f0565b005b61010261019f366004610ec8565b61067d565b60025461014f9073ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1661014f565b6101026101f0366004610d86565b61071e565b610102610203366004610f3d565b610779565b61018f610216366004610d86565b6107a3565b61023e610229366004610d86565b60016020526000908152604090205460ff1681565b604051901515815260200161010c565b61018f61025c366004610f88565b61090e565b61018f61026f366004610d86565b610a19565b60006102813384846102b7565b9392505050565b6002546000906102b1903390849073ffffffffffffffffffffffffffffffffffffffff166102b7565b92915050565b60008373ffffffffffffffffffffffffffffffffffffffff81163314806102ed57503360009081526001602052604090205460ff165b806103a957506040517fe985e9c500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82811660048301523360248301527f0000000000000000000000000000000000000000000000000000000000000000169063e985e9c590604401602060405180830381865afa158015610385573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a99190610fb6565b806103b857506103b881610b49565b61046f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152605b60248201527f526576657273655265676973747261723a2043616c6c6572206973206e6f742060448201527f6120636f6e74726f6c6c6572206f7220617574686f726973656420627920616460648201527f6472657373206f7220746865206164647265737320697473656c660000000000608482015260a4015b60405180910390fd5b600061047a86610bfa565b604080517f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e26020808301919091528183018490528251808303840181526060909201928390528151910120919250819073ffffffffffffffffffffffffffffffffffffffff8916907f6ada868dd3058cf77a48a74489fd7963688e5464b2b0fa957ace976243270e9290600090a36040517f5ef2c7f00000000000000000000000000000000000000000000000000000000081527f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260048201526024810183905273ffffffffffffffffffffffffffffffffffffffff87811660448301528681166064830152600060848301527f00000000000000000000000000000000000000000000000000000000000000001690635ef2c7f09060a401600060405180830381600087803b1580156105cd57600080fd5b505af11580156105e1573d6000803e3d6000fd5b50929998505050505050505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610671576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610466565b61067b6000610cb6565b565b60008061068b8686866102b7565b6040517f7737221300000000000000000000000000000000000000000000000000000000815290915073ffffffffffffffffffffffffffffffffffffffff8516906377372213906106e29084908790600401610fd3565b600060405180830381600087803b1580156106fc57600080fd5b505af1158015610710573d6000803e3d6000fd5b509298975050505050505050565b60007f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e261074a83610bfa565b604080516020810193909352820152606001604051602081830303815290604052805190602001209050919050565b6002546000906102b1903390819073ffffffffffffffffffffffffffffffffffffffff168561067d565b60005473ffffffffffffffffffffffffffffffffffffffff163314610824576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610466565b73ffffffffffffffffffffffffffffffffffffffff81166108c7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603060248201527f526576657273655265676973747261723a205265736f6c76657220616464726560448201527f7373206d757374206e6f742062652030000000000000000000000000000000006064820152608401610466565b600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff16331461098f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610466565b73ffffffffffffffffffffffffffffffffffffffff821660008181526001602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001685151590811790915591519182527f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf87910160405180910390a25050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610a9a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610466565b73ffffffffffffffffffffffffffffffffffffffff8116610b3d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610466565b610b4681610cb6565b50565b60008173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610bd0575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252610bcd9181019061104e565b60015b610bdc57506000919050565b73ffffffffffffffffffffffffffffffffffffffff16331492915050565b600060285b8015610caa577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600f84161a81536010909204917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600f84161a8153601083049250610bff565b50506028600020919050565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b73ffffffffffffffffffffffffffffffffffffffff81168114610b4657600080fd5b60008060408385031215610d6057600080fd5b8235610d6b81610d2b565b91506020830135610d7b81610d2b565b809150509250929050565b600060208284031215610d9857600080fd5b813561028181610d2b565b600080600060608486031215610db857600080fd5b8335610dc381610d2b565b92506020840135610dd381610d2b565b91506040840135610de381610d2b565b809150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112610e2e57600080fd5b813567ffffffffffffffff80821115610e4957610e49610dee565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715610e8f57610e8f610dee565b81604052838152866020858801011115610ea857600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060808587031215610ede57600080fd5b8435610ee981610d2b565b93506020850135610ef981610d2b565b92506040850135610f0981610d2b565b9150606085013567ffffffffffffffff811115610f2557600080fd5b610f3187828801610e1d565b91505092959194509250565b600060208284031215610f4f57600080fd5b813567ffffffffffffffff811115610f6657600080fd5b610f7284828501610e1d565b949350505050565b8015158114610b4657600080fd5b60008060408385031215610f9b57600080fd5b8235610fa681610d2b565b91506020830135610d7b81610f7a565b600060208284031215610fc857600080fd5b815161028181610f7a565b82815260006020604081840152835180604085015260005b8181101561100757858101830151858201606001528201610feb565b81811115611019576000606083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01692909201606001949350505050565b60006020828403121561106057600080fd5b815161028181610d2b56fea26469706673582212208e077ed07786073eb03989981f1f9d5f39373872f073af17c47f3d7a89d0358b64736f6c634300080d0033';
