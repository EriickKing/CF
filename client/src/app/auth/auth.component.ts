import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LogService } from '../Services/auth.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  private user: SocialUser;
  socialL;
  socialR;
  load;
  constructor(
    private fb: FormBuilder,
    private authService: LogService,
    private socialService: AuthService,
    private route: Router) {
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
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(async (userData) => {
      this.user = userData
      this.socialR = await this.socialRegister();
      this.socialL = await this.socialLogin();
      this.route.navigate(['/store'])
        .then(() => {
          location.reload();
        });
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
      return true
    },
      error => {
        console.log(error.error)
      }
    )
  }

  socialLogin() {
    this.authService.socialL({ id: this.user.id }).subscribe(data => {
      localStorage.setItem("config_user_store", data.token);
      localStorage.setItem("config_login", "true");
    },
      error => {
        console.log(error.error)
      }
    )
  }
  ngOnInit() {
  }

}
