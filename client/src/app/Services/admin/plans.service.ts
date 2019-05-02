import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
// import { environment } from "../../../environments/environment";
import { environment } from "../../../environments/environment.prod";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PlansService {
  domain = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  allPlans() {
    return this.http
      .get(this.domain + "/plans/all")
  }

  onePlans() {
    return this.http
      .get(this.domain + "/plans/one" + "?i=" + this.route.snapshot.queryParams["i"])
      .pipe(map((res: any) => res));
  }

  editPlans(
    title: string, 
    price: string, 
    bhour: string, 
    ehour: string, 
    image: File, 
    bpromo: string,
    epromo: string) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("price", price);
    postData.append("bhour", bhour);
    postData.append("ehour", ehour);
    postData.append("image", image);
    postData.append("bpromo", bpromo);
    postData.append("epromo", epromo);
    return this.http
      .put(this.domain + "/plans/edit" + "?i=" + this.route.snapshot.queryParams["i"], postData)
      .pipe(map((res: any) => res));
  }
}
