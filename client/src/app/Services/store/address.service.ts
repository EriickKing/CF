import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
// import { environment } from "../../../environments/environment";
import { environment } from "../../../environments/environment.prod";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  addressByUser(user) {
    return this.http
      .post(this.domain + "/address/byuser", user)
      .pipe(map((res: any) => res));
  }

  postal(postal) {
    return this.http
      .post(this.domain + "/address/postal", postal)
      .pipe(map((res: any) => res));
  }

  addAddress(address) {
    return this.http
      .post(this.domain + "/address/add", address)
      .pipe(map((res: any) => res));
  }

  deleteAddress(param) {
    return this.http
      .post(this.domain + "/address/delete", param)
      .pipe(map((res: any) => res));
  }

  editAddress(param)  {
    return this.http
      .put(this.domain + "/address/edit"+ "?i=" + this.route.snapshot.queryParams["i"], param)
      .pipe(map((res: any) => res));
  }

  one() {
    return this.http
      .get(this.domain + "/address/one" + "?i=" + this.route.snapshot.queryParams["i"])
      .pipe(map((res: any) => res));
  }
}
