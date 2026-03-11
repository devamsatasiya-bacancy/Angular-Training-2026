var person = {
    firstname: "Devam",
    lastname: "Satasiya",
    age: 30,
    address: {
        city: "gandhinagar",
        pincode: "10001",
        street: "123 Main St",
    },
    contacts: [
        { type: "home", number: "123-456-7890" },
        { type: "work", number: "098-765-4321" },
    ],
    getFullName: function () {
        return "".concat(this.firstname, " ").concat(this.lastname);
    },
    getFullAddress: function () {
        return "".concat(this.address.street, ", ").concat(this.address.city, ", ").concat(this.address.pincode);
    },
};
console.log(person.getFullName());
console.log(person.getFullAddress());
