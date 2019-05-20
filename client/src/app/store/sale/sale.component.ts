import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/Services/store/address.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  address;
  constructor(
    private addressService: AddressService
  ) { }

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

  use(address) {
    localStorage.setItem("usead", address);
  }

  ngOnInit() {
    this.byUser();
  }

}
