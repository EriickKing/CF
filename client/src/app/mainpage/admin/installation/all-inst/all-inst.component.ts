import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { InstService } from 'src/app/Services/admin/inst.service';
@Component({
  selector: 'app-all-inst',
  templateUrl: './all-inst.component.html',
  styleUrls: ['./all-inst.component.scss']
})
export class AllInstComponent implements OnInit {
  config: string;
  insts;
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
    private fb: FormBuilder,
    private instService: InstService
  ) {
  }

  get checks() {
    return <FormArray>this.checkForm.get("n");
  };

  getValues() {
    this.values = [];
    this.checks.controls.forEach((control, i) => {
      if (control.value) {
        this.values.push(this.insts[i]._id)
      }
    });
    this.l = this.values.length;
    if (this.values.length === 0 || this.insts.length === 1) {
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
    this.instService.allDelete({ all: this.values }).subscribe(data => {
      location.reload();
    })
  }

  data;
  async all() {
    this.data = await this.instService.allInst().toPromise();
    this.insts = this.data.all;
    this.checkForm = this.fb.group({
      n: this.sharedService.addCheckers(this.insts)
    })
  }


  ngOnInit() {
    this.all();
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }
}
