import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Services/store/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article;

  constructor(
    private articleService: ArticleService,
    private route: Router
  ) { }


  one() {
    this.articleService.one().subscribe(data => {
      this.article = data.one;
    })
  }
  add(id) {
    let a = [];
    a = JSON.parse(localStorage.getItem('avct_item')) || [];
    a.push(id)
    setTimeout(() => {
      localStorage.setItem('avct_item', JSON.stringify(a));
      this.route.navigate(['/store/shopcar']);
    }, 500);
  }

  ngOnInit() {
    this.one();
  }

}
