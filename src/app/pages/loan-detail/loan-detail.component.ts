import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../../services/mortgage.service';
import { IMortgage } from '../../models/mortgage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {

  constructor(private mortgageService: MortgageService, private router: ActivatedRoute) { }
  userSession;

  isCollapsed: boolean = true;
  isVerifySchedule: boolean = false;

  emiDate: number = 0;
  emiAmount: number = 0;
  emiTenure: number = 0;

  isAmountDisable: boolean = false;
  isTenureDisable: boolean = true;

  isVerifyEmiAmount: boolean = true;
  isVerifyEmiTenure: boolean = false;

  mortId: number;
  mortgages: IMortgage[];
  mortgage: IMortgage;

  isModifiedMortgage: boolean = false;

  laertType: string;
  alertMsg: string;

  ngOnInit() {
    this.initGetUser();
    this.mortId = this.router.snapshot.params['id'];
    this.initGetAllMortgages();

    this.isModifiedMortgage = false;
  }

  /**
   * initGetUser() is used to get user data from localStorage
  */
  initGetUser = () => {
    this.userSession = JSON.parse(localStorage.getItem("user"));
  }

  /**
   * initGetAllMortgages() is user to retrive all mortgages loan by this user.
  */
  initGetAllMortgages = () => {
    this.mortgageService.getAllMortgagesGlobal(this.userSession.userId);
    this.mortgageService.allMortgagesGlobal.subscribe(data => {
      this.mortgages = data;
      this.getMortgageDetails(this.mortId);
    })
  }

  /**
   * params: mortgageId
   * getMortgageDetails() is used to retrive mortgage loan detail by mortgageId.
  */
  getMortgageDetails = (mortgageId) => {
    this.mortgages.filter(data => {
      if (data.mortgageId == mortgageId) {
        this.mortgage = data;
      }
    });
  }

  reviseClick = () => {
    this.isCollapsed = false;

    this.emiDate = Number(this.mortgage.emiDate);
    this.emiAmount = this.mortgage.emiAmount;
    this.emiTenure = this.mortgage.tenure;
  }

  radioButton = (event) => {
    let radioVal = event.target.value;
    if (radioVal == 1) {
      this.isAmountDisable = false;
      this.isTenureDisable = true;

      this.isVerifyEmiAmount = true;
      this.isVerifyEmiTenure = false;

    } else if (radioVal == 2) {
      this.isAmountDisable = true;
      this.isTenureDisable = false;

      this.isVerifyEmiAmount = false;
      this.isVerifyEmiTenure = true;

    }
  }

  verifySchedule = () => {
    this.isVerifySchedule = true;
    let reqObj = {};
    reqObj['mortgageId'] = this.mortgage.mortgageId;
    reqObj['mortgageOutstanding'] = this.mortgage.mortgageOutstanding;
    reqObj['rateOfInterest'] = this.mortgage.interestRate;
    reqObj['emiAmount'] = (this.isVerifyEmiAmount) ? this.emiAmount : 0;
    reqObj['tenure'] = (this.isVerifyEmiTenure) ? this.emiTenure : 0;

    this.mortgageService.verifyScheduleRequest(reqObj).subscribe(data => {
      if (data != null && data != undefined) {
        let val = JSON.parse(JSON.stringify(data));
        this.emiAmount = val.emiAmount;
        this.emiTenure = val.tenure;
      }
    });
  }

  confirmSubmit = () => {
    let reqObj = {};
    reqObj['mortgageId'] = this.mortgage.mortgageId;
    reqObj['emiDate'] = this.emiDate;
    reqObj['emiAmount'] = this.emiAmount;
    reqObj['tenure'] = this.emiTenure;

    debugger;
    this.isModifiedMortgage = true;
    this.laertType = 'success';
    this.alertMsg = 'Mortgage Updated Successfully!';
    debugger;
    // this.mortgageService.modifyMortgageRequest(reqObj).subscribe(data => {
    //   if (data != null && data != undefined) {
    //     let val = JSON.parse(JSON.stringify(data));
    //     if (val.message == 'success') {
    //       this.isModifiedMortgage = true;
    //     }
    //   }
    // });

  }

}
