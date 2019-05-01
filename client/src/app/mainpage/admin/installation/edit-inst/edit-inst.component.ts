import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstService } from 'src/app/Services/admin/inst.service';
@Component({
  selector: 'app-edit-inst',
  templateUrl: './edit-inst.component.html',
  styleUrls: ['./edit-inst.component.scss']
})
export class EditInstComponent implements OnInit {
  config: string;
  editForm: FormGroup
  hide = true;
  imagePreview;
  dis = true;
  file;
  acp;
  constructor(
    private sharedService: SharedService,
    private instService: InstService,
    private router: Router
  ) { 
    this.editForm = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      image: new FormControl(null)
    });
  }

  editInst() {
    this.dis = false;
    this.instService.editInst(
      this.editForm.value.title,
      this.editForm.value.image,
    ).subscribe(data => {
      this.router.navigate(["/admin/installation"])
    })
  }

  onFileChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({ image: this.file });
    this.editForm.get("image").updateValueAndValidity();
  }

  toggle() {
    this.hide = !this.hide;
  }

  one() {
    this.instService.oneInst().subscribe(data => {
      this.editForm.get("title").setValue(data.one.title);
      this.editForm.get("image").setValue(data.one.image);
      this.imagePreview = data.one.image;
    })
  }
  ngOnInit() {
    this.one();
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }
}
