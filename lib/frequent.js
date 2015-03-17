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
  /**
   * Initialize the Frequent algorithm instance
   *
   * @param [Integer] n number of items to store in the main window
   * @param [Integer] b number of items to store in a basic window (less than n)
   * @param [Integer] k number of top item categories to track
   */
  initialize: function initialize(n, b, k) {
    this.n = n;
    this.b = b;
    this.k = k || 1;

    this.queue = [];
    this.statistics = {};
    this.delta = 0;
  },
  process: function process(elements) {
    // @TODO Define a var to self reference the algo to handle the 'this' issue?

    if (elements.length != this.b) {
      // @TODO Should raise error instead?
      // Not ready to do anything?
      return {};
    }

    // Step 1
    var batch = {};
    elements.forEach(function(e) {
      batch[e] = batch[e] ? batch[e]+1 : 1;
    });


    var items_in_batch = Object.keys(batch);
    // If the number of unique items < this.k
    var min_k = Math.min(items_in_batch.length, this.k);

    // Step 2 & 3
    var summary = [];
    items_in_batch.forEach(function(e) {
      summary.push({ 'id': e, 'count': batch[e]});
    });
    summary = summary.sort(function (a,b) { return b.count-a.count }).slice(0, min_k);
    this.queue.push(summary);

    // Step 4
    var stat = this.statistics;
    summary.forEach(function(e) {
      stat[e.id] = stat[e.id] ? stat[e.id] + e.count : e.count;
    });

    // Step 5
    this.delta = this.delta + summary[min_k-1].count;

    // Step 6
    if (this.queue.length > this.n/this.b) {
      // a
      var summary_pi = this.queue.shift();
      var min_k_pi = Math.min(summary_pi.length, this.k);
      this.delta = this.delta - summary_pi[min_k_pi-1].count;

      //b
      summary_pi.forEach(function(e){
        stat[e.id] = stat[e.id] - e.count;
        if (stat[e.id] <= 0) {
          delete stat[e.id];
        }
      });

      //c
      var results = {};
      var current_delta = this.delta;
      Object.keys(stat).forEach(function(k){
        if (stat[k] > current_delta) {
          results[k] = stat[k];
        }
      });

      return results;
    }
    else {
      return {};
    }
  }
};