import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { Genre: any}) { }

  ngOnInit(): void {
    
  }
}
