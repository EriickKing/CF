import { Component, OnInit } from '@angular/core';
import { LogService } from '../Services/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
a = localStorage.getItem("config_login");

  constructor(
    private authService: LogService
  ) { 
    if (this.a === null) {
      localStorage.setItem("config_login", "false");
    }
  }

  ngOnInit() {
  }

}
