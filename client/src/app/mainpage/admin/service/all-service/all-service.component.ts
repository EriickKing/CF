import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { ServicesService } from 'src/app/Services/admin/services.service';
@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss']
})
export class AllServiceComponent implements OnInit {
  config: string;
  services;
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
    private serviceService: ServicesService,
    private fb: FormBuilder
  ) {
  }

  get checks() {
    return <FormArray>this.checkForm.get("n");
  };

  getValues() {
    this.values = [];
    this.checks.controls.forEach((control, i) => {
      if(control.value) {
        this.values.push(this.services[i]._id)
      }
    });
    this.l = this.values.length;
    if (this.values.length === 0 || this.services.length === 1) {
      this.remove = true;
    } else {
      this.remove = false;
    }
    if (this.values.length === 0 || this.values.length > 1) {
      this.edit = true
    } else {
      this.edit = false;
      this.param = this.values[0];
    }
  }

  showDelete() {
    this.showD = true;
  }
  
  hideDelete() {
    this.showD = false;
  }

  delete() {
    this.serviceService.allDelete({all: this.values}).subscribe(data => {
      location.reload();
    })
  }
  data;
  async all() {
    this.data = await this.serviceService.allServices().toPromise();
    this.services = this.data.all
    this.checkForm = this.fb.group({
      n: this.sharedService.addCheckers(this.services)
    })
  }


  ngOnInit() {
    this.all();
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }

}
