import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from 'src/app/Services/admin/news.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.scss']
})
export class EditNewComponent implements OnInit {
  config: string;
  editForm: FormGroup
  hide = true;
  imagePreview;
  dis = true;
  file;
  acp;
  constructor(
    private sharedService: SharedService,
    private newService: NewsService,
    private router: Router
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
    this.newService.editNew(
      this.editForm.value.title,
      this.editForm.value.desc,
      this.editForm.value.image,
    ).subscribe(data => {
      this.router.navigate(["/admin/new"])
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
    this.newService.oneNews().subscribe(data => {
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
