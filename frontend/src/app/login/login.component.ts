import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  user: any = {};
  loggedIn: boolean = false;
  constructor(
    private router: Router,
    private service: LoginService,
    private route: ActivatedRoute,
    private authService: SocialAuthService
  ) {}

  onLogin() {
    // console.log(f.value);
    if (this.email.length === 0) {
      alert('email field can not be empty');
    } else if (this.password.length === 0) {
      alert('password field can not be empty');
    } else {
      this.service.login(this.email, this.password).subscribe((res: any) => {
        console.log(res);
        if (res.email !== null) {
          console.log(res);
          localStorage['email'] = res.email;
          localStorage['password'] = res.password;
          this.router.navigate(['/'], {
            queryParams: { email: this.email },
          });
        } else if (res === null) {
          alert('wrong email or password');
        }
      });
    }
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.user = user;
      this.loggedIn = user != null;
    });
  }
}
