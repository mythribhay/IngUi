import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMortgage } from '../models/mortgage';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = 'http://localhost:3000/mortgages';

  apiFirstUrl: string = 'http://10.117.189.56:8883/ingMortgage';
  apiSecondUrl: string = 'http://10.117.189.175:8883/ingMortgage';

  /**
   * getMortgagesList() is user retrive mortgage list from the server.
  */
  getMortgagesList = (userId): Observable<IMortgage[]> => {
    return this._http.get<IMortgage[]>(this.apiFirstUrl + '/mortgages/' + userId);
  }

  /**
   * allMortgagesGlobal variable is used to access all mortgage globaly.
  */
  allMortgagesGlobal: Subject<IMortgage[]> = new Subject<IMortgage[]>();

  /**
   * getAllMortgagesGlobal() is used to call getMortgagesList() and update allMortgagesGlobal variable.
  */
  getAllMortgagesGlobal = (userId) => {
    this.getMortgagesList(userId).subscribe(data => {
      this.allMortgagesGlobal.next(data);
    })
  }

  /**
   * params: reqData
   * verifyScheduleRequest() is used to retrive EMI Amount or Tenure.
  */
  verifyScheduleRequest = (reqData) => {
    return this._http.post(this.apiFirstUrl + '/mortgages/emi', reqData);
  }

  /**
   * params: reqData
   * confirmSubmitRequest() is used to update mortgage base on the mortgage id.
  */
  modifyMortgageRequest = (reqData) => {
    return this._http.post(this.apiSecondUrl + '/update', reqData);
  }

}
