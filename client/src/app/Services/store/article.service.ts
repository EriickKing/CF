import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
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

  findMany(array) {
    return  this.http
      .post(this.domain + "/article/many", array)
      .pipe(map((res: any) => res));

  }

  one() {
    return this.http
      .get(this.domain + "/article/one" + "?i=" + this.route.snapshot.queryParams["i"])
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
