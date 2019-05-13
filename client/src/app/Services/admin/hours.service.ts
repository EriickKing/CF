import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
// import { environment } from "../../../environments/environment.prod";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HoursService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  addHour(data) {
    return this.http
      .post(this.domain + "/hours/add", data)
      .pipe(map((res: any) => res));
  }

  // oneHour(data) {
  //   return this.http
  //     .post(this.domain + "/hours/one", data)
  //     .pipe(map((res: any) => res));
  // }

  oneHour(data) {
    return this.http.post<any>(this.domain + "/hours/one", data)
  }
}
