import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private fb: FormBuilder
  ) { }
  private config = new BehaviorSubject(localStorage.getItem("config_admin"));
  currentConfig = this.config.asObservable();

  private config2 = new BehaviorSubject(localStorage.getItem("config_nav"));
  currentConfig2 = this.config2.asObservable();

  changeConfig(vari: string) {
    this.config.next(vari)
  }
  changeConfig2(vari: string) {
    this.config2.next(vari)
  }

  addCheckers(array) {
    const arr = array.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  };
  
}
