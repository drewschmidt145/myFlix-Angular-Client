import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @component NavbarComponent
 * @description Component representing the navbar.
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss']
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * @constructor - Constructor for NavbarComponent. 
   * @param {Router} router - Router service for navigation.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   */
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * @method openMovieList
   * @description Navigates to the movie list page.
   */
  public openMovieList(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @method openProfile
   * @description Navigates to the user profile page.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @method logoutUser
   * @description Logs out the user by clearing stored token and user data and redirects to the welcome page.
   */
  public logoutUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['welcome']);
  }

}
