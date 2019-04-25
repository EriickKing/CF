import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  e = "https://res.cloudinary.com/dhy7mnmoe/image/upload/v1553591679/Friso/Services/img-20190213-wa0009_fzvxoa.jpg";
  constructor() { }

  ngOnInit() {
  }

}
