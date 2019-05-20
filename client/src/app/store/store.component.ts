import { Component, OnInit } from '@angular/core';
import { LogService } from '../Services/auth.service';
import { ArticleService } from '../Services/store/article.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  a = localStorage.getItem("config_login");
  article;
  constructor(
    private authService: LogService,
    private articleService: ArticleService,
    private title: Title
  ) {
    this.title.setTitle("CF Tienda");
    if (this.a === null) {
      localStorage.setItem("config_login", "false");
    }
  }

  all() {
    this.articleService.findAll().subscribe(data => {
      this.article = data.articles;
    })
  }

  ngOnInit() {
    this.all();
  }

}
