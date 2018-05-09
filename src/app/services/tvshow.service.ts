import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TvshowService extends DataService {
  constructor(http: HttpClient, private authService: AuthService) {
    super('http://api.freshr.nl/tvshows', http);
  }

  getUserTvshows() {
    const token = localStorage.getItem('token');
    const user = this.authService.currentUser;

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + token);

    let Params = new HttpParams();
    Params = Params.append('page', '1');
    Params = Params.append('limit', '100');
    const url = 'http://api.freshr.nl/users/';
    return this.http.get( url + user.id + '/tvshows', { headers: headers, params: Params})
    .catch(this.handleError);
  }
}
