# Object/Array Destructuring

## Examples

### Example 1: Rest operator in array destructuring

```js
const arrValue = ['one', 'two', 'three', 'four'];
const [ ...x, y] = arrValue;
console.log(x); // ['one', 'two', 'three']
console.log(y); // 'four'
```

### Example 2: Nested destructuring assignment in arrays

```js
// nested destructuring assignment in arrays
const arrValue = ["one", ["two", "three"]];
const [x, [y, z]] = arrValue;
console.log(x); // 'one'
console.log([y, z]); // ['two', 'three']
console.log(z); // 'three'
```

### Example 3: Assigning default values

```js
// assigning default value 5 and 7
let arrValue = [10];
let [x = 5, y = 7] = arrValue;
console.log(x); // 10
console.log(y); // 7
```

### Example 4: Rest with array destructuring

```js
const [a, b, ...[length]] = [1, 2, 3];
console.log(a, b, length); // 1 2 3 
```

### Example 5: 

```js

const [a, b, ...{ length }] = [1, 2, 3];
console.log(a, b, length);  // 1 2 1 here the length will be the length of the elements in the object 
```
