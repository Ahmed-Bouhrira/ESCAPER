import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  service: SignupService;
  constructor(private router: Router, userservice: SignupService) {
    this.service = userservice;
  }

  addUser() {
    console.log(this.email);
    if (this.email.length === 0) {
      alert('Please enter your email');
    } else if (this.password.length === 0) {
      alert('please enter your password');
    } else {
      this.service
        .addUser(
          this.firstName,
          this.lastName,
          this.email,
          this.phoneNumber,
          this.password
        )
        .subscribe((res: any) => {
          if (res.email !== null) {
            alert('Added successfully');
            this.router.navigate(['/login']);
          } else {
            alert('error');
          }
        });
    }
  }
  ngOnInit(): void {}
}
