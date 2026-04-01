export interface UserModel {
  id: number;
  name: string;
  email: string;
  salary: number;
  joiningDate: Date;
  address: AddressModel;
  adharNumber: string;
}

export interface AddressModel {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
