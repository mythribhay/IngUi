import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
  title: string = 'Mortgage Application';

  ngOnInit() {
  }

  /**
   * params: userData
   * onLoginSuccess() will call after login get success to set user data in localStorage.
  */
  onLoginSuccess = (userData) => {
    console.log('UserData:');
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    this.userService.updateLoginStatus(true);
    this.router.navigate(['/dashboard']);
  }

}
