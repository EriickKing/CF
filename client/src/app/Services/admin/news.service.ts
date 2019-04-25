import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  allNews() {
    return this.http
      .get(this.domain + "/news/all")
      .pipe(map((res: any) => res));
  }

}
