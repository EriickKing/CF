import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstService } from 'src/app/Services/admin/inst.service';
@Component({
  selector: 'app-add-inst',
  templateUrl: './add-inst.component.html',
  styleUrls: ['./add-inst.component.scss']
})
export class AddInstComponent implements OnInit {
  config: string;
  addForm: FormGroup
  hide = true;
  dis = true;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private instService: InstService
  ) { 
    this.addForm = new FormGroup({
      title: new FormControl(null, { validators: [
        Validators.required
      ]}),
      image: new FormControl(null, { validators: [
        Validators.required
      ]})
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addForm.patchValue({image: file});
    this.addForm.get("image").updateValueAndValidity();
  }

  addInst(){
    this.dis = false; 
    this.instService.addInst(
      this.addForm.value.title,
      this.addForm.value.image
      )
      .subscribe(
        data => {
          this.router.navigate(["/admin/installation"])
        }
      )
  }

  toggle(){
    this.hide = !this.hide;
  }

  ngOnInit() {
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }

}
