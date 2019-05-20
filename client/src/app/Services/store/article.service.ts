import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
// import { environment } from "../../../environments/environment";
import { environment } from "../../../environments/environment.prod";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  domain = environment.apiUrl;
	navbarCartCount = 0;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  allWoman() {
    return this.http
      .get(this.domain + "/article/woman")
      .pipe(map((res: any) => res));
  }

  categoryW(param) {
    return this.http.get<any>(this.domain + "/article/category" + "?filter=" + param)
  }
  categoryW2(param) {
    return this.http.get<any>(this.domain + "/article/category" + "?color=" + param)
  }

  findMany(array) {
    return  this.http
      .post(this.domain + "/article/many", array)
      .pipe(map((res: any) => res));
  }

  findAll() {
    return this.http
      .get(this.domain + "/article/all")
      .pipe(map((res: any) => res));
  }

  one() {
    return this.http
      .get(this.domain + "/article/one" + "?i=" + this.route.snapshot.queryParams["i"])
      .pipe(map((res: any) => res));
  }

  moreless() {
    return this.http
      .get(this.domain + "/article/moreless")
      .pipe(map((res: any) => res));
  }
  lessmore() {
    return this.http
      .get(this.domain + "/article/lessmore")
      .pipe(map((res: any) => res));
  }

	getLocalCartProducts(){
    const products = JSON.parse(localStorage.getItem('avct_item')) || [];

		return products;
	}

	// returning LocalCarts Product Count
	calculateLocalCartProdCounts() {
		this.navbarCartCount = this.getLocalCartProducts().length;
	}

}
