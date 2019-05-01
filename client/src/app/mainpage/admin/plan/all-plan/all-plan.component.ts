import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { PlansService } from 'src/app/Services/admin/plans.service';
@Component({
  selector: 'app-all-plan',
  templateUrl: './all-plan.component.html',
  styleUrls: ['./all-plan.component.scss']
})
export class AllPlanComponent implements OnInit {
  config: string;
  plans;
  selected;
  checkForm: FormGroup;
  values = [];
  remove = true;
  edit = true;
  showD = false;
  param;
  l;
  constructor(
    private sharedService: SharedService,
    private planService: PlansService,
    private fb: FormBuilder
  ) {
  }

  get checks() {
    return <FormArray>this.checkForm.get("n");
  };

  getValues() {
    this.values = [];
    this.checks.controls.forEach((control, i) => {
      if (control.value) {
        this.values.push(this.plans[i]._id)
      }
    });
    this.l = this.values.length;
    if (this.values.length === 0 || this.values.length > 1) {
      this.edit = true
    } else {
      this.edit = false;
      this.param = this.values[0];
    }
  }
  data;
  async all() {
    this.data = await this.planService.allPlans().toPromise();
    this.plans = this.data.all;
    this.checkForm = this.fb.group({
      n: this.sharedService.addCheckers(this.plans)
    })

  }


  ngOnInit() {
    this.all();
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }

}
