import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { NewsService } from 'src/app/Services/admin/news.service';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  config:string;
  news;
  selected;
  checkForm: FormGroup;
  values = [];
  constructor(
    private sharedService: SharedService,
    private newService: NewsService,
    private fb: FormBuilder
  ) { 
    setTimeout(() => {
      this.checkForm = this.fb.group({
        n: this.addCheckers()
      })    
    }, 100);
  };

  addCheckers() {
    const arr = this.news.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  };

  get checks() {
    return <FormArray>this.checkForm.get("n");
  };

  getValues() {
    this.values = [];
    this.checks.controls.forEach((control, i) => {
      if(control.value) {
        this.values.push(this.news[i])
      }
    });
    console.log(this.values);
  }

  all() {
    this.newService.allNews().subscribe(data => {
      this.news = data.news;
      console.log(this.news);
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
