import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firstlook',
  templateUrl: './firstlook.component.html',
  styleUrls: ['./firstlook.component.scss']
})
export class FirstlookComponent implements OnInit {
  e = "https://res.cloudinary.com/dhy7mnmoe/image/upload/v1553591679/Friso/Services/img-20190213-wa0009_fzvxoa.jpg";
  constructor() { }

  ngOnInit() {
  }

}
