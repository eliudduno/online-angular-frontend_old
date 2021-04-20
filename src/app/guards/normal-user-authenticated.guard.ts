import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service-config';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class NormalUserAuthenticatedGuard implements CanActivate {
  constructor(private secService: SecurityService,
    private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.secService.sessionExist() && this.secService.VerifyRolInSesion(ServiceConfig.NORMAL_ROL_ID)) {
      return true;
    } else {
      this.router.navigate(["/home"]);
      return false;
    }
  }

}
