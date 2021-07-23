var testMethod = require('./helpers/test.method.js');

var method = 'getFeeHistory';
var methodCall = 'eth_feeHistory';

var tests = [{
    args: [4, "0xA30953", []],
    result: {
        "baseFeePerGas": [
          "0xa",
          "0x9",
          "0x8",
          "0x9",
          "0x9"
        ],
        "gasUsedRatio": [
          0.003920375,
          0.002625,
          0.904999125,
          0.348347625
        ],
        "oldestBlock": 10684752
    },
    call: methodCall
}];


testMethod.runTests('eth', method, tests);

