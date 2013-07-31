# Compo

Compose a queue of functions. The returns values of the previous function are passed as arguments to the next one.

## Installation

	npm install compo

## Example

```javascript
var Composer = require('compo');
var composer = new Composer();

composer.add(addOne);
composer.add(addOne);
composer.add(function (num) {
	console.log(num); // 3
});

composer.run(1);

function addOne(num, next) {
	next(num + 1);
}
```

## API

```javascript
composer.add(fn);
```

Add a function to the composer queue, if the composer has already run, the function will be automatically dequeued and executed, unless the previous function hasn't finished yet.

`fn` has a signature of `fn(..args, next)`, where `...args` is the returned values of previous function, and `next` is a callback function that should be called when `fn` is finished.

You can pass arguments to `next()`, which will be the returned values of the function. `return` values directly won't work.

```javascript
composer.run(..args);
```

Run the composer, with `...args` being passed to the first function in the queue as arguments.