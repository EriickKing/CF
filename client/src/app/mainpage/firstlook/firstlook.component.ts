import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/Services/admin/news.service';

@Component({
  selector: 'app-firstlook',
  templateUrl: './firstlook.component.html',
  styleUrls: ['./firstlook.component.scss']
})
export class FirstlookComponent implements OnInit {
  e = "https://res.cloudinary.com/dhy7mnmoe/image/upload/v1553591679/Friso/Services/img-20190213-wa0009_fzvxoa.jpg";
  news;
  show = true;
  constructor(
    private newService: NewsService
  ) { }

  three() {
    this.newService.threeNews().subscribe(data => {
      this.news = data.news;
    })
  }

  ngOnInit() {
    this.three();
  }

}
