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

  ngOnInit() {
    this.all();
    // const x = [localStorage.getItem("config_cart")]
  }

}
