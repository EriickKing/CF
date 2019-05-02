import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  config: string;

  constructor(
    private sharedService: SharedService
  ) {
    localStorage.setItem("config_nav", 'false')
    this.config = localStorage.getItem("config_nav");
    this.sharedService.changeConfig2(this.config);
  }



  ngOnInit() {

    this.sharedService.currentConfig2.subscribe(config => this.config = config);
    
  }

}
