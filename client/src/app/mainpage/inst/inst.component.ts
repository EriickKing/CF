import { Component, OnInit } from '@angular/core';
import { InstService } from 'src/app/Services/admin/inst.service';

@Component({
  selector: 'app-inst',
  templateUrl: './inst.component.html',
  styleUrls: ['./inst.component.scss']
})
export class InstComponent implements OnInit {
  data;
  insts;
  constructor(
    private instService: InstService
  ) { }

  async all() {
    this.data = await this.instService.allInst().toPromise();
    this.insts = this.data.all
  }

  ngOnInit() {
    this.all();
  }

}
