import { Component, OnInit, Input, Output } from '@angular/core';
import { AppError } from '../../common/app-error';
import { TvshowService } from '../../services/tvshow.service';
import { BadInput } from '../../common/bad-input';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-watch-status-toggle-button',
  templateUrl: './watch-status-toggle-button.component.html',
  styleUrls: ['./watch-status-toggle-button.component.css']
})
export class WatchStatusToggleButtonComponent implements OnInit {

  status: any;
  showLoader = false;

  @Input() data: any;
  @Output() output: EventEmitter = new EventEmitter();

  constructor(private tvshowService: TvshowService) {
  }

  ngOnInit() {
    this.status = this.data.watch_status;
    console.log(this.data);
  }

  patchResource(id, newStatus) {
    this.showLoader = true;
    const resource = {
      watchStatus: newStatus
    };
    this.tvshowService.update(id, resource).subscribe(
      resp => {
        this.status = newStatus;
        this.showLoader = false;
      }, (error: AppError) => {
        this.showLoader = false;
      if (error instanceof BadInput) {
      } else {
        throw error;
      }

    });
  }
}
