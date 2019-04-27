import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { NewsService } from 'src/app/Services/admin/news.service';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
@Component({
  selector: 'app-all-new',
  templateUrl: './all-new.component.html',
  styleUrls: ['./all-new.component.scss']
})
export class AllNewComponent implements OnInit {
  config: string;
  news;
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
    private newService: NewsService,
    private fb: FormBuilder
  ) { 
    setTimeout(() => {
      this.checkForm = this.fb.group({
        n: this.sharedService.addCheckers(this.news)
      })    
    }, 200);
  };

  get checks() {
    return <FormArray>this.checkForm.get("n");
  };

  getValues() {
    this.values = [];
    this.checks.controls.forEach((control, i) => {
      if(control.value) {
        this.values.push(this.news[i]._id)
      }
    });
    this.l = this.values.length;
    if (this.values.length === 0 || this.news.length === 1) {
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
    this.newService.allDelete({all: this.values}).subscribe(data => {
      location.reload();
    })
  }


  all() {
    this.newService.allNews().subscribe(data => {      
      this.news = data.all;
    })
  }

  select() {
    this.selected = true;
  }
  

  ngOnInit() {
    this.all();
    this.sharedService.currentConfig.subscribe(config => this.config = config);
  }

}
