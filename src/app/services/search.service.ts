
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class SearchService extends DataService {
  constructor(http: HttpClient, private authService: AuthService) {
    super('http://api.freshr.nl/search', http);
  }

  getRandomShows() {
    const token = localStorage.getItem('token');

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + token);
    headers = headers.append('content-type', 'application/json');

    return this.http.get( this.baseUrl, { headers: headers })
    .catch(this.handleError);
  }

  searchForShow(query) {
    const token = localStorage.getItem('token');

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + token);
    headers = headers.append('content-type', 'application/json');

    let Params = new HttpParams();
    Params = Params.append('query', query);

    return this.http.get( this.baseUrl, { headers: headers, params: Params })
    .catch(this.handleError);
  }

}
