import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { WebContract } from '../../models/base/Contrato';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuthenticated = true; // Set this value dynamically

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}