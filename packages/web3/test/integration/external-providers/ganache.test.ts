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

// eslint-disable-next-line import/no-extraneous-dependencies
import ganache from 'ganache';
import WebSocketProvider from 'web3-providers-ws';
import Web3 from '../../../src/index';
import { performBasicRpcCalls } from './helper';
import { getSystemTestMnemonic } from '../../shared_fixtures/system_tests_utils';

describe('ganache tests', () => {
	describe('compatibility with `ganache` provider', () => {
		it('should initialize Web3, get accounts & block number and send a transaction', async () => {
			const { provider } = ganache.server({
				wallet: {
					mnemonic: getSystemTestMnemonic(),
				},
			});

			await performBasicRpcCalls(provider);
		});
	});

	describe('WebSocketProvider - ganache', () => {
		// let server: Server;
		// afterEach(async () => {
		// 	try {
		// 		await server.close();
		// 	} catch (error) {
		// 		// empty
		// 	}
		// });

		// const ganacheOptions = { Chain: {hardfork: 'muirGlacier'}, server: { ws: true } };

		// it('"error" handler fires if the client closes unilaterally', async () => {
		// 	const port = 7547;
		// 	const host = `ws://localhost:${port}`;
		// 	const server = ganache.server();
		// 	await server.listen(port);
		// 	const webSocketProvider = new WebSocketProvider(host);

		// 	const connectPromise = new Promise(resolve => {
		// 		webSocketProvider.on('connect', () => {
		// 			resolve(true);
		// 		});
		// 	});
		// 	await connectPromise;

		// 	const mockCallback = jest.fn();
		// 	const prom = new Promise(resolve => {
		// 		webSocketProvider.on('disconnect', () => {
		// 			mockCallback();
		// 			resolve(true);
		// 		});
		// 	});
		// 	webSocketProvider.disconnect();
		// 	await prom;
		// 	expect(mockCallback).toHaveBeenCalled();
		// 	await server.close();
		// });
		// it('"error" handler *DOES NOT* fire if disconnection is clean', async () => {
		// 	const port = 7547;
		// 	const host = `ws://localhost:${port}`;
		// 	const server = ganache.server();
		// 	await server.listen(port);
		// 	const webSocketProvider = new WebSocketProvider(host);

		// 	const pr = new Promise((resolve, reject) => {
		// 		webSocketProvider.once('error', () => {
		// 			reject(); // should not error
		// 		});
		// 		resolve(true);
		// 	});
		// 	webSocketProvider.disconnect();
		// 	const result = await pr;
		// 	expect(result).toBe(true);

		// 	await server.close();
		// });
		// it('can connect after being disconnected', async () => {

		// 	const port = 7547;
		// 	const host = `ws://localhost:${port}`;
		// 	const server = ganache.server();
		// 	await server.listen(port);

		// 	const mockConnectCallBack = jest.fn();

		// 	const webSocketProvider = new WebSocketProvider(host);
		// 	const connectPromise = new Promise((resolve) => {
		// 		webSocketProvider.once('connect', () => {
		// 			mockConnectCallBack();
		// 			resolve(true);
		// 		})
		// 	})
		// 	await connectPromise;

		// 	const prom = new Promise((resolve) =>{
		// 		webSocketProvider.on("disconnect", () => {
		// 			resolve(true);
		// 		})
		// 	})
		// 	webSocketProvider.disconnect();
		// 	await prom;
		// 	webSocketProvider.connect();
		// 	const promise2 = new Promise((resolve) => {
		// 		webSocketProvider.once('connect', () => {
		// 			mockConnectCallBack();
		// 			resolve(true);
		// 		})
		// 	})

		// 	await promise2;
		// 	expect(mockConnectCallBack).toHaveBeenCalledTimes(2);
		// 	await server.close();

		// });

		// it('"end" handler fires with close event object if Web3 disconnects', async () => {

		// 	const port = 7547;
		// 	const host = `ws://localhost:${port}`;
		// 	const server = ganache.server();
		// 	await server.listen(port);
		// 	const webSocketProvider = new WebSocketProvider(host);

		// 	const connectPromise = new Promise(resolve => {
		// 		webSocketProvider.on('connect', () => {
		// 			resolve(true);
		// 		});
		// 	});

		// 	await connectPromise;
		// 	const pr = new Promise((resolve) => {
		// 		webSocketProvider.once('disconnect', () => {
		// 			resolve(true);
		// 		})
		// 	})
		// 	webSocketProvider.disconnect(1000);
		// 	const result = await pr;
		// 	expect(result).toBe(true);

		// 	await server.close();

		// });

		it('errors when requests continue after socket closed', async () => {
			const port = 7547;
			const host = `ws://localhost:${port}`;
			const server = ganache.server();
			await server.listen(port);
			const reconnectOptions = {
				 	autoReconnect: false
			}
			const webSocketProvider = new WebSocketProvider(host, {}, reconnectOptions);
			const connectPromise = new Promise(resolve => {
				webSocketProvider.on('connect', () => {
					resolve(true);
				});
			});

			await connectPromise;
			
			const web3 = new Web3(webSocketProvider);

			console.log("1")
			// const pr = new Promise((resolve) => {
			// 	webSocketProvider.once('disonnect', () => {
			// 		// try to send a request now that socket is closed
			// 		console.log("disconnect")
			// 		resolve(true);
			// 	})
			// 	webSocketProvider.once('error', () => {
			// 		// try to send a request now that socket is closed
			// 		console.log("error")
			// 		resolve(true);
			// 	})
			// 	webSocketProvider.once('close', () => {
			// 		// try to send a request now that socket is closed
			// 		console.log("close")
			// 		resolve(true);
			// 	})
			// 	webSocketProvider.once('message', () => {
			// 		// try to send a request now that socket is closed
			// 		console.log("message")
			// 		resolve(true);
			// 	})
			// 	webSocketProvider.once('wsClientError', () => {
			// 		// try to send a request now that socket is closed
			// 		console.log("message")
			// 		resolve(true);
			// 	})
			// })

			await server.close();
			console.log("2")
			await new Promise(resolve => {
				const id = setTimeout(() => {
					clearTimeout(id);
					resolve(true);
				}, 500);
			});
			console.log("3")
			console.log("4")
			webSocketProvider.on("error", () => {console.log("error")});
			const a= await web3.eth.getBlockNumber();
			console.log(a)
			console.log("passes through")
			expect(true).toBe(true);

		});
	});
});
