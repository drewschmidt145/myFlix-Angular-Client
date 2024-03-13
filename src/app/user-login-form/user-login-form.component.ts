import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public FetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  

  ngOnInit(): void {
  }

  /**
   * Function responsible for sending the form inputs to the backend
   */
  loginUser(): void {
    this.FetchApiDataService.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('user logged in successfully', 'OK', {
        duration: 2000
      });

      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('login failed', 'OK', {
        duration: 2000
      });
    });
}
}
