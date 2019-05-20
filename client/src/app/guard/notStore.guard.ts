import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LogService } from '../Services/auth.service';


@Injectable()
export class NotStoreGuard implements CanActivate {
    redirectUrl;
    constructor(
        private router: Router,
        private authService: LogService
      ) { }

  canActivate(
      router: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) {
    if(this.authService.loggedStore()) {
        return true
    } else {
        this.redirectUrl = state.url
        this.router.navigate(["/store"])
        return false;
    }
  }
}