import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
// import { environment } from "../../../environments/environment.prod";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InstService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  addInst(title: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("image", image);
    return this.http
      .post(this.domain + "/insts/add", postData)
      .pipe(map((res: any) => res));
  }

  allInst() {
    return this.http
      .get(this.domain + "/insts/all")
  }
  allDelete(array) {
    return this.http
      .post(this.domain + "/insts/many", array)
      .pipe(map((res: any) => res));
  }
  oneInst() {
    return this.http
      .get(this.domain + "/insts/one" + "?i=" + this.route.snapshot.queryParams["i"])
      .pipe(map((res: any) => res));
  }
  editInst(title: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("image", image);
    return this.http
      .put(this.domain + "/insts/edit"+ "?i=" + this.route.snapshot.queryParams["i"], postData)
      .pipe(map((res: any) => res));
  }

}
