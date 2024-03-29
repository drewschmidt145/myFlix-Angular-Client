import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

/**
 * @component WelcomePageComponent
 * @description Represents the welcome page component.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  constructor(public dialog: MatDialog) { }

  /**
   * @method openUserRegistrationDialog
   * @description Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * @method openUserLoginDialog
   * @description Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
