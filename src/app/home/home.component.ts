import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tvShows: any = [];
  showLoader = false;

  constructor(public authService: AuthService, public searchService: SearchService) { }

  ngOnInit() {
    this.getRandomShows();
  }

  logTokenData() {
    const token = this.authService.currentUser;
    console.log(token);
  }

  searchShow(input) {
    if (input.query.length > 1) {
      this.showLoader = true;
      this.searchService.searchForShow(input.query).subscribe(
        resp => {
          this.tvShows = resp.results;
          this.showLoader = false;
        });
    }
  }

  getRandomShows() {
    this.showLoader = true;
    this.searchService.getRandomShows().subscribe(
      resp => {
        const data = resp.results;
        this.tvShows = data.slice(0, 4);
        this.showLoader = false;
      });
  }


}
