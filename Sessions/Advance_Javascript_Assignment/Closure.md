# 1. Write a factorial program of given range: 0 - 10 using closure.

```js
function factorial(start) {
  let factorial = 1;
  /* this is the funciton  which will be returned */
  return (end) => {
    for (let i = start; i <= end; i++) {
      factorial = factorial * i;
    }
    return factorial;
  };
}

/* this will return a function and set a few values in
 the closure environment,  */
const factorialstart1 = factorial(2);

console.log(factorialstart1(4));
```

# 1. Write a factorial program of given range: 0 - 10 using closure.

```js
function factorial(start) {
  let factorial = 1;
  /* this is the funciton  which will be returned */
  return (end) => {
    for (let i = start; i <= end; i++) {
      factorial = factorial * i;
    }
    return factorial;
  };
}

/* this will return a function and set a few values in
 the closure environment,  */
const factorialstart1 = factorial(2);

console.log(factorialstart1(4));
```

# 2.

```js
function calculate(x) {
  function multiply(y) {
    return x * y;
  }
  return multiply;
}

const multiply3 = calculate(3);
const multiply4 = calculate(4);

console.log(multiply3);
console.log(multiply3());

console.log(multiply3(6));
console.log(multiply4(2));
```

output:

```
[Function: multiply]
NaN
18
8
```

by default the value of x and y is undefined, and any operation of a num with undefined will result in NaN, 
in others the x = 3 and x = 4 is in the closure environment

# 3.

```js
function outest() {
  var c = 12;
  function outer(b) {
    function inner() {
      console.log(a, b, c);
    }
    let a = 10; 
    return inner;
  }
  return outer;
}

let a = 100;
var close = outest()("Hi Closures");
close();
```

output:

```
10 Hi Closures 12
```

the inner function accesses variables from its own scope (a=10), the outer scope (b="Hi Closures"), and the outermost scope (c=12), demonstrating nested closures.

# 4.

```js
function setCount() {
  let number = 0;
  return function () {
    console.log(number++);
    console.log(++number);
  };
}

const counter = setCount();
counter();
counter();
counter();
```

output:

```
0
2
2
4
4
6
```

the returned function forms a closure over number, incrementing it each call; number++ logs the current value then increments, ++number increments first then logs, causing the pattern of even numbers.
