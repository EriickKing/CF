import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  config: string;
  @ViewChild("hola") hola:ElementRef

  constructor(
    private sharedService: SharedService
  ) { }



  ngOnInit() {
    this.sharedService.currentConfig2.subscribe(config => this.config = config);
    
  }

}
