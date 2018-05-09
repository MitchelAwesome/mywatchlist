import { Component, OnInit, Input } from '@angular/core';
import { TvshowService } from '../../services/tvshow.service';
import { BadInput } from '../../common/bad-input';
import { AppError } from '../../common/app-error';

@Component({
  selector: 'app-watchlist-button',
  templateUrl: './watchlist-button.component.html',
  styleUrls: ['./watchlist-button.component.css']
})
export class WatchlistButtonComponent implements OnInit {

  @Input() data: any = [];
  isAdded = false;

  constructor(private tvshowService: TvshowService) { }

  ngOnInit() {
  }

  onClick() {
    this.isAdded = !this.isAdded;

    const resource = {
      tvshowId: this.data.id,
      title: this.data.name,
      img: this.data.poster_path,
      watchStatus: 'watching'
    };

    this.tvshowService.create(resource).subscribe(
      resp => {

      }, (error: AppError) => {
        this.isAdded = !this.isAdded;

      if (error instanceof BadInput) {
      } else {
        throw error;
      }

    });
  }

}
