import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LogService } from '../Services/auth.service';


@Injectable()
export class storeGuard implements CanActivate {
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
        this.redirectUrl = state.url
        this.router.navigate(['/auth'])
        return false;
    } else {
        return true;
    }
  }
}