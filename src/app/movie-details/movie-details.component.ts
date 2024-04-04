import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @component MovieDetailsComponent
 * @description Component representing the movie details dialog.
 * @selector 'app-movie-details'
 * @templateUrl './movie-details.component.html'
 * @styleUrls ['./movie-details.component.scss'] */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  /** Details of the movie. */
  movieDetails: string;

  /**
   * @constructor - Constructor for MovieSynopsisComponent. 
   * @param data - Data containing movie discription.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Details: string}) {
    this.movieDetails = data.Details;
  }

  ngOnInit(): void {
  }
}
