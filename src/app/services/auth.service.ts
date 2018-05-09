import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  baseUrl = 'http://api.freshr.nl';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(credentials) {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.set('Content-Type', 'text/plain')
    // .set('Access-Control-Allow-Origin', 'http://www.freshr.nl/');

    return this.http.post(this.baseUrl + '/login', credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    return token != null && !jwtHelper.isTokenExpired(token);
  }

  get currentUser() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    return jwtHelper.decodeToken(token);
  }

  userHasRole(roles) {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    const tokenData = jwtHelper.decodeToken(token);

    const intersection = roles.filter(function(n) {
      return tokenData.roles.indexOf(n) !== -1;
    });

    return intersection.length  > 0;
  }
}
