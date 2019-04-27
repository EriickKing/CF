import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { post } from 'selenium-webdriver/http';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  addNew(title: string, desc: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("desc", desc);
    postData.append("image", image);
    return this.http
      .post(this.domain + "/news/add", postData)
      .pipe(map((res: any) => res));
  }

  allNews() {
    return this.http
      .get(this.domain + "/news/all")
      .pipe(map((res: any) => res));
  }
  allDelete(array) {
    return this.http
      .post(this.domain + "/news/many", array)
      .pipe(map((res: any) => res));
  }
}
