// eslint-disable-next-line max-classes-per-file
import { BlockOutput, SyncOutput, HexString } from 'web3-common';
import { Web3Subscription } from 'web3-core';

type CommonSubscriptionEvents = {
	error: Error;
	connected: number;
};

export class LogsSubscription extends Web3Subscription<
	CommonSubscriptionEvents & {
		data: any;
	},
	{
		fromBlock?: number;
		address?: HexString | HexString[];
		topics?: (HexString | null)[];
	}
> {
	protected _buildSubscriptionParams() {
		return ['logs', this.args] as ['logs', any];
	}

	public _processSubscriptionResult(data: any) {
		this.emit('data', data);
	}

	public _processSubscriptionError(error: Error) {
		this.emit('error', error);
	}
}

export class NewPendingTransactionsSubscription extends Web3Subscription<
	CommonSubscriptionEvents & {
		data: HexString;
	}
> {
	// eslint-disable-next-line
	protected _buildSubscriptionParams() {
		return ['newPendingTransactions'] as ['newPendingTransactions'];
	}

	protected _processSubscriptionResult(data: string) {
		this.emit('data', data);
	}

	protected _processSubscriptionError(error: Error) {
		this.emit('error', error);
	}
}

export class NewHeadsSubscription extends Web3Subscription<
	CommonSubscriptionEvents & {
		data: BlockOutput;
	}
> {
	// eslint-disable-next-line
	protected _buildSubscriptionParams() {
		return ['newHeads'] as ['newHeads'];
	}

	protected _processSubscriptionResult(data: BlockOutput) {
		this.emit('data', data);
	}

	protected _processSubscriptionError(error: Error) {
		this.emit('error', error);
	}
}

export class SyncingSubscription extends Web3Subscription<
	CommonSubscriptionEvents & {
		data: SyncOutput;
		changed: boolean;
	}
> {
	// eslint-disable-next-line
	protected _buildSubscriptionParams() {
		return ['syncing'] as ['syncing'];
	}

	protected _processSubscriptionResult(data: SyncOutput) {
		this.emit('data', data);
	}

	protected _processSubscriptionError(error: Error) {
		this.emit('error', error);
	}
}
