import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserModel[] = [
    {
      id: 1,
      name: 'devam',
      email: 'devam@example.com',
      salary: 50000,
      joiningDate: new Date('2022-01-01'),
      address: { street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001' },
      adharNumber: '123456789012',
    },
    {
      id: 2,
      name: 'sanjay',
      email: 'sanjay@example.com',
      salary: 60000,
      joiningDate: new Date('2021-06-15'),
      address: { street: '456 Elm St', city: 'Los Angeles', state: 'CA', zipCode: '90001' },
      adharNumber: '987654321012',
    }

  ];


  getUsers(): Observable<UserModel[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.users);
        observer.complete();
      }, 1000); 
    });
  }


}
