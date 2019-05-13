import { Component, OnInit } from '@angular/core';
import { LogService } from '../Services/auth.service';
import { ArticleService } from '../Services/store/article.service';

@Component({
  selector: 'app-navbar-s',
  templateUrl: './navbar-s.component.html',
  styleUrls: ['./navbar-s.component.scss']
})
export class NavbarSComponent implements OnInit {
  log;
  bol;
  constructor(
    private authService: LogService,
    public articleService: ArticleService
  ) { }

  cog_log() {
    this.log = this.authService.cog_log();
    if (this.log === 'false') {
      this.bol = false;
    } else {
      this.bol = true;
    }
  }

  ngOnInit() {
    this.cog_log()
    this.articleService.calculateLocalCartProdCounts();
  }

}
