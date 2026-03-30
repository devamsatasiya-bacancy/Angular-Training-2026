export interface ContactUsFormModel {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  gender: string;
  address: {
    streetAddress: string;
    city: string;
    pincode: string;
  };
  rememberMe: boolean;
}
