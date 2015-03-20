# frequent.js [![Build Status](https://secure.travis-ci.org/sytong/frequent.js.png?branch=master)](http://travis-ci.org/sytong/frequent.js)

`frequent.js` is a JavaScript implementation of the FREQUENT algorithm
for identifying frequent items in a data stream in sliding windows.
Please refer to [Identifying Frequent Items in Sliding Windows over On-Line
Packet Streams](http://erikdemaine.org/papers/SlidingWindow_IMC2003/), by
Golab, DeHaan, Demaine, L&#243;pez-Ortiz and Munro (2003).

## Getting Started
Install the module with: `npm install frequent`
Run JSHint and nodeunit test with: `grunt`

## Documentation
Please refer to [`README.md`](https://github.com/sytong/frequent.js/blob/master/README.md) for now.

## Examples
```javascript
var Frequent = require('frequent');
var algorithm = new Frequent(20, 10, 3);
algorithm.process([3,1,4,1,5,9,2,6,5,3]);  // {}
algorithm.process([5,8,9,7,9,3,2,3,8,4]);  // {}
algorithm.process([6,2,6,4,3,3,8,3,2,7]);  // { '3': 5 }
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Willie Tong  
Licensed under the MIT license.
