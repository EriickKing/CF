import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from 'src/app/Services/store/address.service';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-addr',
  templateUrl: './edit-addr.component.html',
  styleUrls: ['./edit-addr.component.scss']
})
export class EditAddrComponent implements OnInit {
  editForm: FormGroup
  sia = true;
  suburb = [];
  valPostal = false;
  param;
  constructor(
    private addressService: AddressService,
    private _location: Location,
    private route: ActivatedRoute,
    private title: Title
  ) {
    this.title.setTitle("CF Direccion"); 
    this.editForm = new FormGroup({
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
    this.addressService.postal({ postal: this.editForm.value.postal }).subscribe(data => {
      if (data.postal.length > 0) {
        this.valPostal = false;
        this.editForm.get("state").setValue(data.postal[0].estado);
        this.editForm.get("municip").setValue(data.postal[0].municipio);
        this.editForm.get("city").setValue(data.postal[0].ciudad);
        for (let i = 0; i < data.postal.length; i++) {
          this.suburb.push(data.postal[i].name);
        }
      } else {
        this.valPostal = true;
        this.editForm.get("state").setValue("");
        this.editForm.get("municip").setValue("");
        this.editForm.get("city").setValue("");
        this.suburb = [];
      }

    })
    // console.log(this.suburb);
  }
  one() {
    this.addressService.one().subscribe(data => {
      this.editForm.get("user").setValue(data.one.user);
      this.editForm.get("name").setValue(data.one.name);
      this.editForm.get("address").setValue(data.one.address);
      this.editForm.get("phone").setValue(data.one.phone);
      this.editForm.get("postal").setValue(data.one.postal);
      this.editForm.get("state").setValue(data.one.state);
      this.editForm.get("municip").setValue(data.one.municip);
      this.editForm.get("city").setValue(data.one.city);
      this.editForm.get("suburb").setValue(data.one.suburb);
    })
  }

  edit() {
    this.addressService.editAddress(this.editForm.value).subscribe(data => {
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
    this.one();
  }

}
