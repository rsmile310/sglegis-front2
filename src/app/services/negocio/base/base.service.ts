
import {throwError as observableThrowError,  Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { WebContract } from '../../../models/base/Contrato';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BaseService {
  public _Url = environment.apiURL;

  constructor( ) {  }

  public handleError(error: HttpErrorResponse) {
    console.log("erro no servidor:"+error.message);
    
    if (error.error instanceof ErrorEvent) {      
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(
        `Erro no servidor ${error.status}, ` +
        `Resultado do erro: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Erro, tente novamente');
  };

  public getToken(res: HttpResponse<WebContract>) {    
    var tok = res.headers.get("Token");
    if (tok){
       localStorage.setItem("Token", res.headers.get("Token"));   
    }
  };

}
