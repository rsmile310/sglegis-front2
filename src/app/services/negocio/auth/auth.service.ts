import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AUTHService extends BaseService {

  constructor(
    private _http: HttpClient
  ) { 
    super();
  }

  public login(email: string, password: string): Observable<any> {
    return this._http.post<any>(this._Url + "/users/login", { email, password })
      .map(res => {
        return res;
      })
  }

  public checkAuthenticate(): Observable<any> {
    return this._http.get<any>(this._Url + "/users/current")
      .map(res => {
        return res;
      })    
  }
}
