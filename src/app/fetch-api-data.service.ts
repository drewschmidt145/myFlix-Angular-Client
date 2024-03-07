import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = '';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

   /**
   * Making the api call for the user login endpoint
   * @param {any} userDetails - User details for login.
   * @returns {Observable<any>} - Observable for the API response.
   */
   public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Api call for the Get All Movies endpoint
   * @returns {Observable<any>} - Observable for the API response.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Non-typed response extraction.
   * @param {Object} res - API response.
   * @returns {any} - Extracted response data.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Api call for the Get One Movie endpoint.
   * @param {string} title - One movie title.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call for the Get Director endpoint.
   * @param {string} DirectorName - genre name for genre
   * @returns {Observable<any>} - Observable for the API response.
   */
  getDirector(DirectorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + DirectorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call for the Get Genre endpoint.
   * @param {string} GenreName
   * @returns {Observable<any>} - Observable for the API response.
   */
  getGenre(GenreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + GenreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call for the Get User endpoint.
   * @param {string} Username - get username for user
   * @returns {Observable<any>} - Observable for the API response.
   */
  getUser(Username: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );  }

  /**
   * Api call for the Get Favourite Movies for a user endpoint
   * @param {string} Username - Users username for getting favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getFavouriteMovies(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + Username + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      //map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * Api call for the Add a Movie to Favourite Movies endpoint.
   * @param {any} movie - Movie for adding to favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
  addFavouriteMovies( movie: any ): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call for the Edit User endpoint.
   * @param {any} userDetails - User details for updating user information.
   * @returns {Observable<any>} - Observable for the API response.
   */
  editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userDetails.Username, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call for the Delete User endpoint
   * @returns {Observable<any>} - Observable for the API response.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call for the Delete a Movie to Favourite Movies endpoint
   * @param {any} movie - Movie for deleting from favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
  deleteFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie._id);
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}