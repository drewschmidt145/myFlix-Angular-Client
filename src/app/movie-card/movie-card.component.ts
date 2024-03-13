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
  user: any = {};
  userData = { Username: "", FavoriteMovies: []};
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;

  constructor(
    public fetchMovies: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    
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
   * Function to get favMovie list.
   * @returns Favorite movies of user.
   */
  getFavMovies(): void { 
    this.user = this.fetchMovies.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Fav Movies in getFavMovie', this.FavoriteMovies); 
  }

  /**
   * Function to check if movie is a favorite movie.
   * @param movie  - Movie object to check.
   * @returns {boolean} - Boolean indicating whether the movie is a favorite.
   */
  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Function add / delete favMovie by icon button
   * @param {any} movie - Movie to toggle favorite icon for. 
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  /**
   * Function to add movie to favMovie list
   * @param {any} movie - Movie to add to favorite movies.
   * @returns Message "Movie has been added to your favorites!"
   */
  addFavMovies(movie: any): void {
    this.user = this.fetchMovies.getUser();
    this.userData.Username = this.user.Username;
    this.fetchMovies.addFavoriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies(); 
      this.snackBar.open('Movie has been added to your favorites.', 'OK', {
        duration: 3000,
      });
    });
  }

  /**
   * Function to delete movie from favMovie list.
   * @param {any} movie - Movie to delete from favorite movies.
   * @returns Message "Movie has been deleted from your favorites!"
   */
  deleteFavMovies(movie: any): void {
    this.user = this.fetchMovies.getUser();
    this.userData.Username = this.user.Username;
    this.fetchMovies.deleteFavoriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this.snackBar.open('Movie has been deleted from your favorites.', 'OK', {
        duration: 3000,
      });
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
