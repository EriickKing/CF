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

  changeConfig(vari: string) {
    this.config.next(vari)
  }

  addCheckers(array) {
    const arr = array.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  };
  
}
