# Prototype

## Task

Define a program that creates a custom method for the Array or Object prototype, then calls that method on its instance.

## Solution

```js
// Adding a custom method to Array prototype
Array.prototype.sum = function () {
  return this.reduce((acc, curr) => acc + curr, 0);
};

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.sum()); // 15


Object.prototype.greet = function () {
  return `Hello, ${this.name || "World"}!`;
};

const person = { name: "devam" };
console.log(person.greet()); 

const obj = {};
console.log(obj.greet());
```
