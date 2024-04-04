import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the genre info dialog.
 * @selector 'app-genre'
 * @templateUrl './genre.component.html'
 * @styleUrls ['./genre.component.scss']
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent implements OnInit {

  /**
   * @constructor - constructor for GenreComponent
   * @param data - data containing the genre information
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Genre: any}) { }

  ngOnInit(): void {
    
  }
}
