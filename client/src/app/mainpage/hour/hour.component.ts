import { Component, OnInit } from '@angular/core';
import { HoursService } from 'src/app/Services/admin/hours.service';

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.scss']
})
export class HourComponent implements OnInit {
  array;
  data;
  show;
  s;
  constructor(
    private hourService: HoursService
  ) {

  }

  async n() {
    localStorage.setItem("config_hour", "normal")
    this.data = await this.hourService.oneHour({ category: localStorage.getItem("config_hour") }).toPromise();
    this.array = this.data.one;
    this.s = localStorage.getItem("config_hour");
  }
  async b() {
    localStorage.setItem("config_hour", "box")
    this.data = await this.hourService.oneHour({ category: localStorage.getItem("config_hour") }).toPromise();
    this.array = this.data.one;
    this.s = localStorage.getItem("config_hour");
  }
  async c() {
    localStorage.setItem("config_hour", "crossfit")
    this.data = await this.hourService.oneHour({ category: localStorage.getItem("config_hour") }).toPromise();
    this.array = this.data.one;
    this.s = localStorage.getItem("config_hour");
  }
  ngOnInit() {
    this.s = localStorage.getItem("config_hour");
    this.n();
  }

}
