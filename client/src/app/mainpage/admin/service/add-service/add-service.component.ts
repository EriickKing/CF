import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/admin/services.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  config: string;
  addForm: FormGroup
  hide = true;
  imagePreview;
  dis = true;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private serviceService: ServicesService
  ) { 
    this.addForm = new FormGroup({
      title: new FormControl(null, { validators: [
        Validators.required
      ]}),
      desc: new FormControl(null, { validators: [
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
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  addService(){
    this.dis = false; 
    this.serviceService.addService(
      this.addForm.value.title,
      this.addForm.value.desc,
      this.addForm.value.image
      )
      .subscribe(
        data => {
          this.router.navigate(["/admin/service"])
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
