import { inject, Injectable } from '@angular/core';
import { RegisterRequestModel } from '../models/auth/auth-model';
import { HttpClient } from '@angular/common/http';
import { devenvironment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpclient : HttpClient = inject(HttpClient);

  login() {

  }
  register(registerRequest: RegisterRequestModel){

    return this.httpclient.post(`${devenvironment.apiUrl}/auth/register`, registerRequest);
    
  }
  logout(){

  }
}
