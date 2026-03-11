# Spread Operator

## Task: Convert a specified number to an array of digits
Input: 123  
Output: [1, 2, 3]

### Solution
```js
function numberToDigits(num) {
  return [...num].map(Number);
}

console.log(numberToDigits(123)); // [1, 2, 3]
```

## Examples

### Example 1
```js
var alphabets = ["A", ..."BCD", "E"];
console.log(alphabets); // ["A", "B", "C", "D", "E"]
```

### Example 2
```js
var newArray = [...[,,]];
console.log(newArray); // [undefined, undefined]
```