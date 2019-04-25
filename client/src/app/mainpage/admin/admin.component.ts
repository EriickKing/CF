import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  vari = false;
  config = localStorage.getItem("config_admin");
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  toggle(){
    this.vari = !this.vari;
    localStorage.setItem("config_admin", this.vari.toString());
    this.config = localStorage.getItem("config_admin");
    this.sharedService.changeConfig(this.config);
  }

}
