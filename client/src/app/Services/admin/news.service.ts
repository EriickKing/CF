import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
// import { environment } from "../../../environments/environment.prod";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  domain = environment.apiUrl;
  // params = {i: this.route.snapshot.queryParams["i"]};
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
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
    return this.http.get<any>(this.domain + "/news/all")

  }
  allDelete(array) {
    return this.http
      .post(this.domain + "/news/many", array)
      .pipe(map((res: any) => res));
  }
  oneNews() {
    return this.http
      .get(this.domain + "/news/one" + "?i=" + this.route.snapshot.queryParams["i"])
      .pipe(map((res: any) => res));
  }
  editNew(title: string, desc: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("desc", desc);
    postData.append("image", image);
    return this.http
      .put(this.domain + "/news/edit"+ "?i=" + this.route.snapshot.queryParams["i"], postData)
      .pipe(map((res: any) => res));
  }

  threeNews() {
    return this.http
      .get(this.domain + "/news/three")
      .pipe(map((res: any) => res));
  }

}
