import { Injectable } from '@angular/core';
// import { environment } from "../../environments/environment";
import { environment } from "../../environments/environment.prod";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class LogService {
  domain = environment.apiUrl;
  helper = new JwtHelperService;
  constructor(
    private http: HttpClient
  ) { }

  loggedIn() {
    return this.helper.isTokenExpired(localStorage.getItem("config_user"));
  }
  // asd() {
  //   console.log(this.helper.getTokenExpirationDate(localStorage.getItem("config_user")));
  // }
  logout() {
    localStorage.setItem("config_user", "");
  }

  register(user) {
    return this.http
      .post(this.domain + "/register", user)
      .pipe(map((res: any) => res));
  };

  login(user) {
    return this.http
      .post(this.domain + "/login", user)
      .pipe(map((res: any) => res));
  }


  //STORE
  socialR(user) {
    return this.http
      .post(this.domain + "/socialregister", user)
      .pipe(map((res: any) => res));
  };

  socialL(user) {
    return this.http
      .post(this.domain + "/sociallogin", user)
      .pipe(map((res: any) => res));
  };

  loggedStore() {
    return this.helper.isTokenExpired(localStorage.getItem("config_user_store"));
  }

  logoutStore() {
    localStorage.removeItem("config_user_store")
    localStorage.removeItem("config_id")
    localStorage.setItem("config_login" , "false")
  }

  cog_log() {
    return localStorage.getItem("config_login");
  }

  oneUser(user) {
    return this.http
      .post(this.domain + "/oneuser", user)
      .pipe(map((res: any) => res));
  }
}
