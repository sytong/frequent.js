'use strict';

var Frequent = require('../lib/frequent.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.initialize = {
  'specify all parameters': function (test) {
    var algorithm = new Frequent(20, 10, 3);
    test.expect(3);
    test.equals(algorithm.n, 20);
    test.equals(algorithm.b, 10);
    test.equals(algorithm.k, 3);
    test.done();
  },
  'should use default k': function (test) {
    var algorithm = new Frequent(20, 10);
    test.expect(3);
    test.equals(algorithm.n, 20);
    test.equals(algorithm.b, 10);
    test.equals(algorithm.k, 1);
    test.done();
  }
};

exports['run frequent'] = {
  '3 iterations': function (test) {
    var algorithm = new Frequent(20, 10, 3);

    var results = algorithm.process([3,1,4,1,5,9,2,6,5,3]);
    test.expect(13);
    test.equals(algorithm.queue.length, 1);
    test.equals(Object.keys(algorithm.statistics).length, 3);
    test.equals(algorithm.delta, 2);
    test.equals(Object.keys(results).length, 0);

    results = algorithm.process([5,8,9,7,9,3,2,3,8,4]);
    test.equals(algorithm.queue.length, 2);
    test.equals(Object.keys(algorithm.statistics).length, 5);
    test.equals(algorithm.delta, 4);
    test.equals(Object.keys(results).length, 0);

    results = algorithm.process([6,2,6,4,3,3,8,3,2,7]);
    test.equals(algorithm.queue.length, 2);
    test.equals(Object.keys(algorithm.statistics).length, 5);
    test.equals(algorithm.delta, 4);
    test.equals(Object.keys(results).length, 1);
    test.equals(results[3], 5);

    test.done();
  }
};