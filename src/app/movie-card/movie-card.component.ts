import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * @component MovieCardComponent
 * @description Component representing the movie card.
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss'] */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  user: any = {};
  userData = { Username: "", FavoriteMovies: [] };
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;

  /**
   * @constructor - Constructor for MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialog} dialog - Material dialog service for opening dialogs.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   */
  constructor(
    public fetchMovies: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * @method getMovies
   * @description Retrieves all movies from the API.
   * @returns All Movies.
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @method getFavMovies
   * @description Retrieves favorite movies of the user.
   * @returns list of favorites movies
   */
  getFavMovies(): void {
    this.user = this.fetchMovies.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Fav Movies in getFavMovie', this.FavoriteMovies);
  }

  /**
   * @method isFav
   * @description Checks if a movie is a favorite.
   * @param movie - The movie object to check.
   * @returns Boolean indicating whether the movie is a favorite.
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
   * @method toggleFav
   * @description Toggles the favorite status of a movie.
   * @param movie - The movie object to toggle favorite status for.
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  /**
   * @method addFavMovies
   * @description Adds a movie to the list of favorite movies.
   * @param movie - The movie object to add to favorite movies.
   * @returns message "Movie has been added to your favorites."
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
   * @method deleteFavMovies
   * @description Deletes a movie from the list of favorite movies.
   * @param movie - The movie object to delete from favorite movies.
   * @returns mesage "Movie has been deleted from your favorites."
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

  /**
   * @method getGenre
   * @description Opens a dialog to display genre details.
   * @param Genre - The genre object to display details for.
   * @returns genre object of movie
   */
  public getGenre(Genre: any) {
    this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: { Genre: Genre } });
  }

  /**
   * @method getOneDirector
   * @description Opens a dialog to display director details.
   * @param Director - The director object to display details for.
   * @returns director object of movie
   */
  public getOneDirector(Director: any) {
    this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: { Director: Director } });
  }

  /**
   * @method openMovieDetails
   * @description Opens a dialog to display movie details.
   * @param Details - The details of the movie to display.
   * @returns movie description
   */
  public openMovieDetails(Details: string) {
    this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: { Details: Details } });
  }

}
