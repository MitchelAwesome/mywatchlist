import { Component, OnInit } from '@angular/core';
import { TvshowService } from '../services/tvshow.service';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowsComponent implements OnInit {
  showLoader = false;
  metadata: any = [];
  watchlist: any = [];

  constructor(public tvshowService: TvshowService) {
  }

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.showLoader = true;
    this.tvshowService.getUserTvshows()
      .subscribe(result => {
        this.watchlist = result.data;
        this.showLoader = false;
      });
  }

  deleteShow(show) {
    const index = this.watchlist.indexOf(show);
    this.watchlist.splice(index, 1);

    this.tvshowService.delete(show.id)
    .subscribe(
      null,
      (error: AppError) => {
      this.watchlist.splice(index, 0, show);
      if (error instanceof NotFoundError) {
        alert('post does not exist or is already deleted');
      } else {
        throw error;
      }

    });
  }



}
