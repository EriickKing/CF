import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from 'src/app/Services/store/address.service';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm: FormGroup
  sia = true;
  suburb = [];
  valPostal = false;
  constructor(
    private addressService: AddressService,
    private _location: Location,
    private title: Title
  ) {
    this.title.setTitle("CF Direccion");
    this.addForm = new FormGroup({
      user: new FormControl(localStorage.getItem("config_id"), {

      }),
      name: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      address: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      phone: new FormControl(null, {
        validators: [
          Validators.compose([
            Validators.required,
            Validators.min(10)
          ])
        ]
      }),
      postal: new FormControl(null, {
        validators: [
          Validators.compose([
            Validators.required,
            Validators.min(5)
          ])
        ]
      }),
      state: new FormControl(null, {}),
      municip: new FormControl(null, {}),
      city: new FormControl(null, {}),
      suburb: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
    });
  }

  postal() {
    this.suburb = [];
    this.addressService.postal({ postal: this.addForm.value.postal }).subscribe(data => {
      if (data.postal.length > 0) {
        this.valPostal = false;
        this.addForm.get("state").setValue(data.postal[0].estado);
        this.addForm.get("municip").setValue(data.postal[0].municipio);
        this.addForm.get("city").setValue(data.postal[0].ciudad);
        for (let i = 0; i < data.postal.length; i++) {
          this.suburb.push(data.postal[i].name);
        }
      } else {
        this.valPostal = true;
        this.addForm.get("state").setValue("");
        this.addForm.get("municip").setValue("");
        this.addForm.get("city").setValue("");
        this.suburb = [];
      }

    })
    // console.log(this.suburb);
  }
  add() {
    this.addressService.addAddress(this.addForm.value).subscribe(data => {
      this._location.back();
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  ngOnInit() {
  }

}
