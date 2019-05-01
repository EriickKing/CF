import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  addService(title: string, desc: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("desc", desc);
    postData.append("image", image);
    return this.http
      .post(this.domain + "/services/add", postData)
      .pipe(map((res: any) => res));
  }

  allServices() {
    return this.http.get<any>(this.domain + "/services/all")
  }
  allDelete(array) {
    return this.http
      .post(this.domain + "/services/many", array)
      .pipe(map((res: any) => res));
  }
  oneServices() {
    return this.http
      .get(this.domain + "/services/one" + "?i=" + this.route.snapshot.queryParams["i"])
      .pipe(map((res: any) => res));
  }
  editServices(title: string, desc: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("desc", desc);
    postData.append("image", image);
    return this.http
      .put(this.domain + "/services/edit"+ "?i=" + this.route.snapshot.queryParams["i"], postData)
      .pipe(map((res: any) => res));
  }
}
