import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/admin/services.service';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  config: string;
  editForm: FormGroup
  hide = true;
  imagePreview;
  dis = true;
  file;
  acp;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private serviceService: ServicesService
  ) { 
    this.editForm = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      desc: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      image: new FormControl(null)
    });
  }

  editNew() {
    this.dis = false;
    this.serviceService.editServices(
      this.editForm.value.title,
      this.editForm.value.desc,
      this.editForm.value.image,
    ).subscribe(data => {
      this.router.navigate(["/admin/service"])
    })
  }

  onFileChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({ image: this.file });
    this.editForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  toggle() {
    this.hide = !this.hide;
  }

  one() {
    this.serviceService.oneServices().subscribe(data => {
      this.editForm.get("title").setValue(data.one.title);
      this.editForm.get("desc").setValue(data.one.desc);
      this.editForm.get("image").setValue(data.one.image);
      this.imagePreview = data.one.image;
    })
  }
  ngOnInit() {
    this.one();
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }

}
