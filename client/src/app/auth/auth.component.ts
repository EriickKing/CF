import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LogService } from '../Services/auth.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  private user: SocialUser;

  constructor(
    private fb: FormBuilder,
    private authService: LogService,
    private socialService: AuthService) {
    this.registerForm = this.fb.group({
      name: [""],
      email: [""],
      password: [""]
    });
    this.loginForm = this.fb.group({
      email: [""],
      password: [""]
    })
  }

  facebookLogin() {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData
      console.log(this.user);
      this.socialRegister();
      setTimeout(() => {
        this.socialLogin();
      }, 200);
    })
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error.error)
      }
    )
  }

  socialRegister() {
    this.authService.socialR({
      name: this.user.name,
      id: this.user.id,
      email: this.user.email,
      provider: this.user.provider
    }).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error.error)
      }
    )
  }

  socialLogin() {
    this.authService.socialL({ id: this.user.id }).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error.error)
      }
    )
  }
  ngOnInit() {
  }

}
