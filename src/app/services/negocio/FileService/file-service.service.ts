import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService extends BaseService {

  constructor(
    private _http: HttpClient
  ) {
    super();
  }

  public uploadFile(files: any[], api: string, dir: string) {
    const formData = new FormData();
    formData.append('dir', dir);
    files.forEach(file => formData.append('files', file));
    return this._http.post<any>(this._Url + api, formData, { observe: 'response' })
        .map(res => {
          return res;
        })
        .catch(this.handleError);
  }
}
