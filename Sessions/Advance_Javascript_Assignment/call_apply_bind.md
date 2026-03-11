# Call, Apply and Bind

## Task

Define a program with two objects `person1` and `person2`. Both have `firstname`, `lastname` properties (use any name you want).
Add a function `fullname` in `person1` with two arguments (prefix, suffix), which prints person's fullname using firstname lastname and adds prefix and suffix accordingly if present.
Note: this fullname function is present in object person1 only.

Using `call`, `apply`, `bind`, print the fullname of person2 with proper parameter passed.

## Solution

```js
let person1 = {
  firstName: "devam",
  lastName: "satasiya",
  getFullName: function (prefix, suffix) {
    let fullName = this.firstname + " " + this.lastname;
    if (prefix) fullName = prefix + " " + fullName;
    if (suffix) fullName += " " + suffix;
    return fullName;
  },
};

let person2 = {
  firstName: "rahul",
  lastName: "patel",
};

let getfullnameFunc = person1.getFullName;

let getfullname = getfullnameFunc.bind(person2);
console.log(getfullname("mr"));

console.log(getfullnameFunc.call(person2, "mr", "hello"));
console.log(getfullnameFunc.apply(person2, ["Sir", "Great"]));
```
