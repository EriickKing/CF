import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/Services/admin/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  data;
  plans;
  constructor(
    private planService: PlansService
  ) { }

  async all() {
    this.data = await this.planService.allPlans().toPromise();
    this.plans = this.data.all;
  };

  ngOnInit() {
    this.all();
  }

}
