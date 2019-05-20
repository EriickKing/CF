import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/Services/store/address.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address;
  constructor(
    private addressService: AddressService,
    private title: Title
  ) { 
    this.title.setTitle("CF Direccion");
  }

  byUser() {
    this.addressService.addressByUser({ user: localStorage.getItem("config_id") }).subscribe(data => {
      this.address = data.address;
    })
  }

  delete(param) {
    this.addressService.deleteAddress({id: param}).subscribe(data => {
      location.reload();
    })
  }

  ngOnInit() {
    this.byUser();
  }

}
