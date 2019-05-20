import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LogService } from '../Services/auth.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
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
  putamadre;
  success;
  message;
  constructor(
    private authService: LogService,
    private socialService: AuthService,
    private route: Router,
    private title: Title
    ) {
      this.title.setTitle("CF Autenticacion");
    this.registerForm = new FormGroup({
      name: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    })
  }
  facebookLogin() {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(async (userData) => {
      this.user = userData
      this.socialR = await this.socialRegister();
      this.socialL = await this.socialLogin();
      setTimeout(() => {
        this.putamadre =  this.route.navigate(['/store'])
        .then(() => {
          location.reload();
        });
      }, 1000);
    });
  };

  googleLogin() {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (userData) => {
      this.user = userData
      console.log(this.user.name)
      this.socialR = await this.socialRegister();
      this.socialL = await this.socialLogin();
      setTimeout(() => {
        this.putamadre =  this.route.navigate(['/store'])
        .then(() => {
          location.reload();
        });
      }, 1000);
    });
  };

  register() {
    this.authService.register(this.registerForm.value).subscribe(data => {
      this.authService.login({
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value
      }).subscribe(data => {
        localStorage.setItem("config_user_store", data.token);
        localStorage.setItem("config_id", data.user._id)
        localStorage.setItem("config_login", "true");
        this.route.navigate(['/store'])
          .then(() => {
            location.reload();
          });
      })
    })
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem("config_user_store", data.token);
      localStorage.setItem("config_id", data.user._id)
      localStorage.setItem("config_login", "true");
      this.route.navigate(['/store'])
        .then(() => {
          location.reload();
        });
    }, error => {
      this.success = error.error.success
      this.message = error.error.message
    })
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
        return false
      }
    )
  }

  socialLogin() {
    this.authService.socialL({ id: this.user.id }).subscribe(data => {
      localStorage.setItem("config_user_store", data.token);
      localStorage.setItem("config_id", data.user._id)
      localStorage.setItem("config_login", "true");
    },
      error => {
        return false
      }
    )
  }
  ngOnInit() {
  }

}
