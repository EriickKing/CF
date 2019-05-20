import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(
    public authService: LogService,
    public route: Router,
    private title: Title
  ) { 
    this.title.setTitle("CF Perfil");
  }

  logout() {
    this.authService.logoutStore();
    this.route.navigate(["/auth"])
  }

  one() {
    this.authService.oneUser({id: localStorage.getItem("config_id")}).subscribe(data => {
        this.user = data.one
    })
  }

  ngOnInit() {
    this.one();
  }

}
