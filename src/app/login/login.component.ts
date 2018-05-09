import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin = false;
  showLoader = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  signIn(credentials) {
    this.showLoader = true;
    this.authService.login(credentials)
    .subscribe((response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        this.router.navigate([returnUrl || '/']);
        this.invalidLogin = false;
        this.showLoader = false;
      }
    }, (error: Response) => {
        this.invalidLogin = true;
        this.showLoader = false;
    });



  }

}
