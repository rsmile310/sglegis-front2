import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { WebContract } from '../../models/base/Contrato';
import { AUTHService } from '../negocio/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuthenticated = true; // Set this value dynamically

  constructor(
    private router: Router, 
    private auth: AUTHService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    console.log(this.getToken());
    
    if (this.getToken()) {
      this.auth.checkAuthenticate().subscribe(res => {        
        localStorage.setItem('user', JSON.stringify(res));
      }, err => {
        this.router.navigate(['/sessao/entrar']);
      })
      return true;
    } else {      
      this.router.navigate(['/sessao/entrar']);
      return false;
    }
    
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}