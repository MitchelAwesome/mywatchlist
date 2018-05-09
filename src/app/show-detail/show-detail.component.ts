import { Component, OnInit } from '@angular/core';
import { TvshowService } from '../services/tvshow.service';
import { Routes, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  showLoader = false;
  show;


  constructor(public searchService: SearchService, private routes: ActivatedRoute) {

  }

  ngOnInit() {
    const id = this.routes.snapshot.paramMap.get('id');
    this.showLoader = true;
    this.searchService.get(id).subscribe(
      result => {
        this.show = result;
        this.showLoader = false;
        console.log(result);
      });
  }

}
