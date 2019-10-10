import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mortgage Application';

  constructor(private router: Router, private userService: UserService) { }

  /**
   * headerLogInBtn() will be used to redirect to login page.
  */
  headerLogInBtn = () => {
    console.log('Login Click Working...');
  }

  /**
   * headerLogOutBtn() is used to perform logout.
  */
  headerLogOutBtn = () => {
    let userData = localStorage.getItem("user");
    if (userData != null && userData != undefined) {
      localStorage.removeItem("user");
    }
    this.userService.updateLoginStatus(false);
    this.router.navigate(['/login']);
  }
}
