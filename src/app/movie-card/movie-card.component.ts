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
 * @description Represents a component that displays movie cards and allows interactions with them, such as adding to favorites and opening details.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  /** Array containing movie objects. */
  movies: any[] = [];

  /** Object representing the current user. */
  user: any = {};

  /** Object containing user data including username and favorite movies. */
  userData = { Username: "", FavoriteMovies: [] };

  /** Array containing favorite movies of the user. */
  FavoriteMovies: any[] = [];

  /** Boolean indicating whether the movie is a favorite. */
  isFavMovie: boolean = false;

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
   */
  public getGenre(Genre: any) {
    this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: { Genre: Genre } });
  }

  /**
   * @method getOneDirector
   * @description Opens a dialog to display director details.
   * @param Director - The director object to display details for.
   */
  public getOneDirector(Director: any) {
    this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: { Director: Director } });
  }

  /**
   * @method openMovieDetails
   * @description Opens a dialog to display movie details.
   * @param Details - The details of the movie to display.
   */
  public openMovieDetails(Details: string) {
    this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: { Details: Details } });
  }

}
