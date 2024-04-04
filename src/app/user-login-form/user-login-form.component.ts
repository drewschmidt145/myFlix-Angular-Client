import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @component UserLoginFormComponent
 * @description Component representing the login form.
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss'] */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /** Input data for user login containing username and password. */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} FetchApiDataService - Service for fetching data from the API.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Material dialog service for opening user login dialog.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   * @param {Router} router - Router service for navigation.
   */
  constructor(
    public FetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  

  ngOnInit(): void {
  }

  /**
   * @method loginUser
   * @description Sends the user login credentials to the backend for authentication.
   * @returns message saying "User logged in successfully" / "Login failed"
   */
  loginUser(): void {
    this.FetchApiDataService.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('User logged in successfully', 'OK', {
        duration: 2000
      });

      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }
}
