import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlansService } from 'src/app/Services/admin/plans.service';
@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {
  config: string;
  editForm: FormGroup
  hide = true;
  dis = true;
  file;
  acp;
  constructor(
    private sharedService: SharedService,
    private planService: PlansService,
    private router: Router
  ) { 
    this.editForm = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      price: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      bhour: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      ehour: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      bpromo: new FormControl(""),
      epromo: new FormControl(""),
      image: new FormControl(null),
    });
  }

  editPlan() {
    this.dis = false;
    this.planService.editPlans(
      this.editForm.value.title,
      this.editForm.value.price,
      this.editForm.value.bhour,
      this.editForm.value.ehour,
      this.editForm.value.image,
      this.editForm.value.bpromo,
      this.editForm.value.epromo,
    ).subscribe(data => {
      this.router.navigate(["/admin/plan"])
    });
  };

  onFileChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({ image: this.file });
    this.editForm.get("image").updateValueAndValidity();
  }

  one() {
    this.planService.onePlans().subscribe(data => {
      this.editForm.get("title").setValue(data.one.title);
      this.editForm.get("price").setValue(data.one.price);
      this.editForm.get("bhour").setValue(data.one.bhour);
      this.editForm.get("ehour").setValue(data.one.ehour);
      this.editForm.get("bpromo").setValue(data.one.bpromo);
      this.editForm.get("epromo").setValue(data.one.epromo);
      this.editForm.get("image").setValue(data.one.image);
    })
  }

  ngOnInit() {
    this.one();
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }

}
