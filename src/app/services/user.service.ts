import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsers } from '../models/users';
import { ILoginUser } from '../models/loginuser';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private router: Router) { }

  apiFirstUrl: string = 'http://10.117.189.56:8883/ingMortgage';

  /**
   * Declare loginStatus global veriable to track the login status.
  */
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * This function is to update the loginStatus global veriable after changed login status.
  */
  updateLoginStatus = (status: boolean) => {
    this.loginStatus.next(status);
  }

  /**
   * This function is to check user login info from localStorage and redirect the page
  */
  checkUserLoginStatusAndRedirect = () => {
    let userData = localStorage.getItem("user");
    if (userData != null && userData != undefined) {
      this.updateLoginStatus(true);
      this.router.navigate(['/dashboard']);
    } else {
      this.updateLoginStatus(false);
      this.router.navigate(['/']);
    }
  }

  /**
   * This function is to check user login.
  */
  userLogin = (reqData): Observable<ILoginUser[]> => {
    return this._http.post<ILoginUser[]>(this.apiFirstUrl + '/login', reqData);
  }

  /**
   * getUserDetails() is used to get user details base on user id.
  */
  getUserDetails = (id): Observable<IUsers> => {
    return this._http.get<IUsers>(this.apiFirstUrl + '/users/' + id);
  }

}
