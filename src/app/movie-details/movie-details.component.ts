import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})

export class MovieDetailsComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Details: string}) { }

  ngOnInit(): void {
  }
}
