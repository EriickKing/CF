import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LogService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cf-admin',
  templateUrl: './cf-admin.component.html',
  styleUrls: ['./cf-admin.component.scss']
})
export class CfAdminComponent implements OnInit {
  adminForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: LogService,
    private router: Router
  ) { 
    this.adminForm = this.fb.group({
      email: [""],
      password: [""]
    })
  }

  login() {
    this.authService.login(this.adminForm.value).subscribe(data => {
      localStorage.setItem("config_user", data.token);
      this.router.navigate(["/admin"])
    })
  }

  ngOnInit() {
  }

}
