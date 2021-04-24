
import {throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClientModule, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import 'rxjs/Rx';
import { WebContract } from '../../models/base/Contrato';
import { BaseService } from '../negocio/base/base.service';


export class IMenuItem {
  public type: string;       // Possible values: link/dropDown/icon/separator/extLink
  public name?: string;      // Used as display text for item and title for separator type
  public state?: string;     // Router state
  public icon?: string;      // Item icon name
  public tooltip?: string;   // Tooltip text 
  public disabled?: boolean; // If true, item will not be appeared in sidenav.
  public sub?: IChildItem[]  // Dropdown items
}
export class IChildItem {
  public type: string;       // Possible values: link/dropDown/icon/separator/extLink
  public name?: string;      // Used as display text for item and title for separator type
  public state?: string;     // Router state
  public icon?: string;      // Item icon name
  public tooltip?: string;   // Tooltip text 
  public disabled?: boolean; // If true, item will not be appeared in sidenav.  
}

@Injectable()
export class NavigationService extends BaseService {  
  private _api = "/menu";

  constructor(private _http: HttpClient) {
    super();
  } 

  public getMenus(): Observable<WebContract> {    
         
    return this._http.get<WebContract>(this._Url+this._api, { observe: 'response' })
    .do(res => this.getToken(res))
    .map(res => {
      var cnt = new WebContract();
      cnt = res.body;
      return cnt;
      })
      .catch(this.handleError);            
  }

  iconTypeMenuTitle: string = 'Frequently Accessed';
}