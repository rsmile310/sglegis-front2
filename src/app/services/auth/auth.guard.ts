import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { Action } from 'rxjs/internal/scheduler/Action';
import { WebContract } from '../../models/base/Contrato';
import { AUTHService } from '../negocio/auth/auth.service';
import { select, Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { selectState } from 'app/store/selectors';
import { roles } from 'app/models/auth/roles';
import { profile } from 'app/models/auth/profile.types';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuthenticated = true; // Set this value dynamically
  auth$: Observable<any>;

  constructor(
    private router: Router, 
    private auth: AUTHService,
    private store: Store<any>
  ) {     
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.getUser();      
    const currentRoute: any = await this.getCurrentRoute(route, state);
    
    // for client, operational type
    if (currentUser.role !== roles.admin && (currentRoute.data.profiles && currentRoute.data.profiles.indexOf(currentUser.user_profile_type) === -1)) {
      this.router.navigate(['/']);
      return false;
    }
           
    if (this.getToken()) {
      if (currentRoute.data.roles && currentRoute.data.roles.indexOf(currentUser.role) === -1) {
        this.router.navigate(['/']);
        return false;
      } else {
        this.setCurrentUser();
        return true;
      }
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

  setCurrentUser() {
    this.auth.checkAuthenticate().subscribe(res => {  
      localStorage.setItem('user', JSON.stringify(res));
    }, err => {
      this.router.navigate(['/sessao/entrar']);
    })
  }

  getCurrentRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { url } = state;
    const path = url.split("/")[url.split("/").length - 1];
    return new Promise((resolve) => {
      this.findRoute(route, path, (res) => {
        resolve(res);        
      }); 
    })
  }

  findRoute(route, path, callBack) {
    const { routeConfig } = route;       
    if (routeConfig.path === path) callBack(route);
    this.findRoute(route.firstChild, path, callBack);
  }
}