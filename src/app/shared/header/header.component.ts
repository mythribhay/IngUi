import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  /*Declare isLogin flag to track login status*/
  isLogin: boolean;
  @Input() title: string = 'Application Name';
  @Output() signInEvent = new EventEmitter();
  @Output() signOutEvent = new EventEmitter();

  ngOnInit() {
    this.userService.checkUserLoginStatusAndRedirect();
    this.getLoginStatus();
  }

  /*This function is to get user login stats and update the isLogin flag*/
  getLoginStatus() {
    this.userService.loginStatus.subscribe(data => {
      this.isLogin = data;
    });
  }

  /*Functon to call signInChild Event*/
  signInChild() {
    this.signInEvent.emit();
  }

  /*Functon to call signOutChild Event*/
  signOutChild() {
    this.signOutEvent.emit();
  }

}
