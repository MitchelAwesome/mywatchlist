import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

@Injectable()
export class DataService {

  constructor(public baseUrl: string, public http: HttpClient) {

  }

  getAll() {
    return this.http.get(this.baseUrl)
    .catch(this.handleError);
  }

  get(id) {
    return this.http.get(this.baseUrl + '/' + id)
    .catch(this.handleError);
  }

  create(resource) {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      'authorization': 'Bearer ' + token
    });

    return this.http.post(this.baseUrl, resource, {headers: headers})
    .catch(this.handleError);
  }

  update(id, resource) {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      'authorization': 'Bearer ' + token
    });
    return this.http.put(this.baseUrl + '/' + id, resource, {headers: headers})
    .catch(this.handleError);
  }

  delete (id) {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      'authorization': 'Bearer ' + token
    });
    return this.http.delete(this.baseUrl + '/' + id, {headers: headers})
    .catch(this.handleError);
  }

  protected handleError(error: Response) {

    if (error.status === 400) {
      return Observable.throw(new BadInput);
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }

    return Observable.throw(new AppError(error));
  }
}
