import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class LogService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  register(user) {
    return this.http
      .post(this.domain + "/register", user)
      .pipe(map((res: any) => res));
  };

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
}
