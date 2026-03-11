# 1. List down techniques with examples where hoisting does not work as expected in JS

How Different Declarations Handle Hoisting : 
var: Declarations are moved to the top and initialized with undefined.
let and const: These are hoisted, but not initialized, creating a Temporal Dead Zone (TDZ) where they cannot be accessed until their declaration is reached.
Functions: Function declarations are fully moved, allowing them to be called before their definition in the code.
Function Expressions: Only the variable name is hoisted, not the function assignment, often resulting in errors if called too early

## 1. let and const Declarations (Temporal Dead Zone):
```js
// Global scope variable

function outerFunction() {
    
    var globalVar = "I am in outer!";

  function innerFunction() {
      /* here we cannot assign because we are 
    in the temporal dead zone 
    because the x is declared but the 
    value is not assigned yet, 
    (not even undefined ) */
    x = 5;
    console.log(x);
    let x ;
  }

  innerFunction();

}
//console.log(globalVar);
outerFunction();


```
## 2. Function Expressions/Arrow Functions

```js
getUserData(); // TypeError: getUserData is not a function
var getUserData = (id) => console.log("Fetching Users for " + id);


```

## 3. Class 
```js
const user = new User(); // ReferenceError: Cannot access 'User' before initialization
class User {}

```
## 4. Initialization Hoisting
```js 
console.log(x); // undefined
var x = 5;
```


# 2. OUTPUT OF THE CODE: 

## hello is logged, because var is hoisted and the initial value is undefined, and then set to "hello", 
## but console.log(b) will throw ReferenceError: b is not defined because its not defined in the global scope

-- so all the variable defined in the outer scope can be accessed in the inner scope but not vice-versa.




