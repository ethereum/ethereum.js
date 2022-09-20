#!/usr/bin/env bash

ORIGARGS=("$@")

helpFunction() {
	echo "Usage: $0 [start|stop] [background]"
	exit 1 # Exit script after printing help
}

start() {
	. scripts/env.sh

	if [ -z "${ORIGARGS[1]}" ]
	then
		echo "Starting geth..."
		echo "docker run -p $WEB3_SYSTEM_TEST_PORT:$WEB3_SYSTEM_TEST_PORT --name web3-geth-client ethereum/client-go --nodiscover --networkid 1111 --nousb --ws --ws.addr 0.0.0.0 --ws.port $WEB3_SYSTEM_TEST_PORT --http --http.addr 0.0.0.0 --http.port $WEB3_SYSTEM_TEST_PORT --allow-insecure-unlock --http.api personal,web3,eth,admin,debug,txpool,net --ws.api personal,web3,eth,admin,debug,miner,txpool,net --dev --keystore '/root'"
        docker run -p $WEB3_SYSTEM_TEST_PORT:$WEB3_SYSTEM_TEST_PORT ethereum/client-go --nodiscover --networkid 1111 --nousb --ws --ws.addr 0.0.0.0 --ws.port $WEB3_SYSTEM_TEST_PORT --http --http.addr 0.0.0.0 --http.port $WEB3_SYSTEM_TEST_PORT --allow-insecure-unlock --http.api personal,web3,eth,admin,debug,txpool,net --ws.api personal,web3,eth,admin,debug,miner,txpool,net --dev --datadir /root
	else
		echo "Starting geth..."
		echo "docker run -d -p $WEB3_SYSTEM_TEST_PORT:$WEB3_SYSTEM_TEST_PORT ethereum/client-go --nodiscover --networkid 1111 --nousb --ws --ws.addr 0.0.0.0 --ws.port $WEB3_SYSTEM_TEST_PORT --http --http.addr 0.0.0.0 --http.port $WEB3_SYSTEM_TEST_PORT --allow-insecure-unlock --http.api personal,web3,eth,admin,debug,txpool,net --ws.api personal,web3,eth,admin,debug,miner,txpool,net --dev --keystore '/root'"
        docker run -d -p $WEB3_SYSTEM_TEST_PORT:$WEB3_SYSTEM_TEST_PORT ethereum/client-go --nodiscover --networkid 1111 --nousb --ws --ws.addr 0.0.0.0 --ws.port $WEB3_SYSTEM_TEST_PORT --http --http.addr 0.0.0.0 --http.port $WEB3_SYSTEM_TEST_PORT --allow-insecure-unlock --http.api personal,web3,eth,admin,debug,txpool,net --ws.api personal,web3,eth,admin,debug,miner,txpool,net --dev --datadir /root
		echo "Waiting for geth..."
		npx wait-port "$WEB3_SYSTEM_TEST_PORT"
		echo "Geth started"
	fi
}

stop() {
	echo "Stopping geth ..."
	docker ps -q --filter ancestor="ethereum/client-go" | xargs -r docker stop
}

case $1 in
start) start ;;
stop) stop ;;
*) helpFunction ;; # Print helpFunction in case parameter is non-existent
esac
