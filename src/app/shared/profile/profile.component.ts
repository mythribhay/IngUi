import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUsers } from '../../models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  userSession;
  user: IUsers;
  ctx: {};

  ngOnInit() {
    this.initGetUser();
    this.initGetUserDetail();
  }

  initGetUser = () => {
    this.userSession = JSON.parse(localStorage.getItem("user"));
  }

  initGetUserDetail = () => {
    this.userService.getUserDetails(this.userSession.userId).subscribe(data => {
      this.user = data;
      this.ctx = {
        id: this.user.userId,
        name: this.user.userName,
        email: this.user.email,
        contact: this.user.contact,
        address: this.user.address
      };
    })
  }

}
