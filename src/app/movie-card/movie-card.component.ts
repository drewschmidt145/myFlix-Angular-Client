import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favorites: any[] = [];

  user = JSON.parse(localStorage.getItem('user') || '');

  constructor(
    public fetchMovies: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
    
    ) {  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /** 
   * Get user info and set favorites
   * @returns favorite movies selected by user
   * */

  getFavorites(): void {
    this.fetchMovies.getOneUser().subscribe(
      (resp: any) => {
        if (resp.user && resp.user.FavoriteMovies) {
          this.favorites = resp.user.FavoriteMovies;
        } else {
          this.favorites = []; // Set an empty array if data is not available
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.favorites = []; // Set an empty array on error as well
      }
    );
  }

 /**
    * Check if a movie is a user's favorite already
    * @param _id
    * @returns boolean
    * */

  isFavoriteMovie(_id: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(_id) >= 0;
  }

  toggleFavorite(movie: any): void {
    if (this.isFavoriteMovie(movie._id)) {
      this.removeFavoriteMovie(movie._id);
    } else {
      this.addToFavorites(movie._id);
    }
  }

  /**
   * Add a movie to a user's favorites 
   * Or remove on click if it is already a favorite
   * @param _id 
   * @returns success message
   * */

  public addToFavorites(_id: string): void {
    if (this.isFavoriteMovie(_id)) {
      // Movie is already a favorite, so remove it
      this.removeFavoriteMovie(_id);
    } else {
      // Movie is not a favorite, so add it
      this.fetchMovies.addFavoriteMovies(_id).subscribe(() => {
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
        this.getFavorites();
        console.log(this.isFavoriteMovie)
      });
    }
  }

  /**
 * This will remove movie from user's favorite list
 * @param _id 
 * @returns suceess message
 */

  public removeFavoriteMovie(_id: string): void {
    this.fetchMovies.deleteFavoriteMovie(_id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      });
      // Update the favorites list after removal
      this.getFavorites();
      this.cdr.detectChanges();
      console.log(this.isFavoriteMovie)
    });
  }
  
  public getGenre(Genre: any){
    this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: {Genre: Genre}});
  }

  public getOneDirector(Director: any){
    this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: {Director: Director}});
  }  

  public openMovieDetails(Details: string){
    this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: {Details: Details}});
  }

}
