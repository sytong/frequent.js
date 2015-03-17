/**
 * The MIT License (MIT)
 * Copyright (c) 2015 Willie Tong
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 **/

 module.exports = {
  setUp: function (callback) {
    this.frequent = require('../lib/frequent.js');
    callback();
  },
  tearDown: function (callback) {
    // clean up
    callback();
  },
  test_initialize: function (test) {
    var algorithm = Object.create(this.frequent);
    algorithm.initialize(20, 10, 3);
    test.expect(3);
    test.equals(algorithm.n, 20);
    test.equals(algorithm.b, 10);
    test.equals(algorithm.k, 3);
    test.done();
  },
  test_initialize_default_k: function (test) {
    var algorithm = Object.create(this.frequent);
    algorithm.initialize(20, 10);
    test.expect(3);
    test.equals(algorithm.n, 20);
    test.equals(algorithm.b, 10);
    test.equals(algorithm.k, 1);
    test.done();
  },
  test_process: function (test) {
    var algorithm = Object.create(this.frequent);
    algorithm.initialize(20, 10, 3);

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