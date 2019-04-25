import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private config = new BehaviorSubject(localStorage.getItem("config_admin"));
  currentConfig = this.config.asObservable();

  changeConfig(vari: string) {
    this.config.next(vari)
  }
}
