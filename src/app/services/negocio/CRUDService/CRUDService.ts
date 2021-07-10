import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';


@Injectable({
  providedIn: 'root'
})
export class CRUDService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }

  public Save(doc: any, novo: boolean, api: string, id : string): Observable<any> {
    if (novo === true) {
      return this._http.post<any>(this._Url + api, doc, { observe: 'response' })
        //.do(res => this.getToken(res))
        .map(res => {
          return res;
        })
        .catch(this.handleError);
    }
    else {
      return this._http.put<any>(this._Url + api+"/"+ id, doc, { observe: 'response' })
        //.do(res => this.getToken(res))
        .map(res => {          
          return res;
        })
        .catch(this.handleError);
    }
  }

  public Delete(doc: any, api: string): Observable<any> {
    let htppParams = new HttpParams();

    return this._http.delete<any>(this._Url + api,
      { observe: 'response', params: doc })
      .map(res => {
        return res;
      })
      .catch(this.handleError);
  }

  public List(parametro: string, api: string): Observable<any> {
    return this._http.get<any>(this._Url + api, { observe: 'response'  })
      .map(res => {        
        return res;
      })
      .catch(this.handleError);
  }

  public GetParams(parametros: any, api: string): Observable<any> {
    return this._http.get(this._Url + api, { observe: 'response', params: parametros })
      .map(res => {
        return res;
      })
      .catch(this.handleError);
  }

  public GetParamsSearch(parameters:[CampoBusca], api: string): Observable<any> {    
    let p = new HttpParams();
    for (let i = 0; i < parameters.length; i++){     
      if (parameters[i].value) {        
        p = p.append("fields", parameters[i].nomeCampo);
        p = p.append("ops", (parameters[i].tipoCampo == 'string') ? "like" : "eq");
        p = p.append("values", parameters[i].value);
      }
    }
    
    return this._http.get<any>(this._Url + api+"/query", { observe: 'response', params: p })
    .map(res => {
      return res;
    })
    .catch(this.handleError);
  }

  public DeleteParams(id : string, api: string): Observable<any> {
    return this._http.delete(this._Url + api+"/"+id, { observe: 'response' })
      .map(res => {
        return res;
      })
      .catch(this.handleError);
  }

  public getUrl(url: string): Observable<any>{
    return this._http.get(url, { observe: 'response' })
    .map(res => {
      return res;
    })
    .catch(this.handleError);
    
  }

}
