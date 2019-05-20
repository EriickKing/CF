import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Services/store/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-woman',
  templateUrl: './woman.component.html',
  styleUrls: ['./woman.component.scss']
})
export class WomanComponent implements OnInit {
  w;
  Params;
  Par;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle("CF Mujer");
   }

  all() {
    this.articleService.allWoman().subscribe(data => {
      this.router.navigate([], { queryParams: {}});
      this.w = data.article
    })
  }
  data;
  par;
  async param() {
    this.par = await this.route.queryParams.subscribe((params) => {
      this.Params = params["filter"];
    });
    this.data = await this.articleService.categoryW(this.Params).toPromise();
    this.w = this.data.article
  }

  async param2() {
    this.par = await this.route.queryParams.subscribe((params) => {
      this.Params = params["color"];
    });
    this.data = await this.articleService.categoryW2(this.Params).toPromise();
    this.w = this.data.article
  }

  moreless() {
    this.articleService.moreless().subscribe(data => {
      this.w = data.article
    })
  }
  lessmore() {
    this.articleService.lessmore().subscribe(data => {
      this.w = data.article
    })
  }

  onChange(value) {
    console.log(value);
    if (value === "Nuevo") {
      this.all()
    } else if (value === "Mayor Precio") {
      this.moreless()
    } else if (value === "Menor Precio") {
      this.lessmore()
    }
  }

  ngOnInit() {
    this.all();
    // const x = [localStorage.getItem("config_cart")]
  }

}
