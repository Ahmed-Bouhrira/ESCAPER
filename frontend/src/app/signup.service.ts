import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  http: HttpClient;
  url = 'http://localhost:3000/api/user/register';
  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }
  addUser(
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String
  ) {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
    console.log(body);
    return this.http.post(this.url, body);
  }
}
