import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from 'src/app/Services/admin/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  config: string;
  addForm: FormGroup
  hide = true;
  imagePreview;
  dis = true;
  constructor(
    private sharedService: SharedService,
    private newService: NewsService,
    private router: Router
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
  };

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

  addNew(){
    this.dis = false; 
    this.newService.addNew(
      this.addForm.value.title,
      this.addForm.value.desc,
      this.addForm.value.image
      )
      .subscribe(
        data => {
          this.router.navigate(["/admin/news"])
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
