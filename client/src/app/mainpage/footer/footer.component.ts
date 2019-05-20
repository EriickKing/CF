import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  fb(){
    (window as any).open("https://www.facebook.com/centrofitlm/");
  }
  ig(){
    (window as any).open("https://www.instagram.com/centrofitgym/");
  }
  ngOnInit() {
  }

}
