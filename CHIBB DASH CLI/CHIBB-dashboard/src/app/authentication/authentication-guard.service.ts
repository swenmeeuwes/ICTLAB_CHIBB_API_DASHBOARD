import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private _authenticationService: AuthenticationService, public router: Router) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        var isAuthenticated = this._authenticationService.isAuthenticated();
        if (!isAuthenticated)
          this.router.navigate(['/overview']);
        return isAuthenticated;
    }
}