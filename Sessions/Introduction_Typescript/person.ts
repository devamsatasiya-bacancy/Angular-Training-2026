    // interfaces for person details
interface Address {
  city: string;
  pincode: string;
  street: string;
}

interface Contact {
  type: string; // like 'home', 'work', 'mobile'
  number: string;
}

// main person interface with methods
interface PersonInfo {
  firstname: string;
  lastname: string;
  age: number;
  address: Address;
  contacts: Contact[];
  getFullName(): string;
  getFullAddress(): string;
}


const person: PersonInfo = {
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
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  },
  getFullAddress() {
    return `${this.address.street}, ${this.address.city}, ${this.address.pincode}`;
  },
};


console.log(person.getFullName()); 
console.log(person.getFullAddress()); 
