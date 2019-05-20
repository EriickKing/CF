import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Services/store/article.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  article;
  sum;
  suc;
  constructor(
    private articleService: ArticleService,
    private title: Title
  ) { this.title.setTitle("CF Carrito")}

  findmany() {
    this.articleService.findMany({ all: JSON.parse(localStorage.getItem("avct_item")) }).subscribe(data => {
      this.article = data.articles;
      this.sum = this.article.reduce((acc, obj) => acc + obj.price, 0);
      this.suc = true;
    }, error => {
      this.suc = error.error.success
    })
  }

  clean() {
    localStorage.removeItem("avct_item")
    location.reload();
  }

  remove(id) {
    const products = JSON.parse(localStorage.getItem('avct_item'));
    for (let i = 0; i < products.length; i++) {
			if (products[i]._id === id._id) {
				products.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
    localStorage.setItem('avct_item', JSON.stringify(products));
    location.reload();
  }
  ngOnInit() {
    this.findmany();
  }

}
