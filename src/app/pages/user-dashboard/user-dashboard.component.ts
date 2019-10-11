import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../../services/mortgage.service';
import { IMortgage } from '../../models/mortgage';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private mortgageService: MortgageService) { }
  userSession;
  pieData: any;
  pieColorCodes: any[] = ["#FF6384", "#36A2EB", "#FFCE56", "#fe5711", "#00a79d", "#003673"];;

  pieChatlabels = ['A', 'B', 'C'];
  pieChatData = [300, 50, 100];
  pieChatBG = ["#FF6384", "#36A2EB", "#FFCE56"];
  pieChatBGHover = ["#FF6384", "#36A2EB", "#FFCE56"];
  pieTotalOutstanding = 0;
  pieTotalPaymentAmount = 0;

  loans: IMortgage[];

  ngOnInit() {
    this.initGetUser();
    this.initGetAllMortgages();

    setTimeout(() => {
      this.initPieChat();
    }, 1000);
  }

  /**
   * initGetUser() is used to get user data from localStorage
  */
  initGetUser = () => {
    this.userSession = JSON.parse(localStorage.getItem("user"));
  }

  /**
   * initPieChat() is used to form Pie chat data.
  */
  initPieChat = () => {
    this.pieData = {
      labels: this.pieChatlabels,
      datasets: [
        {
          data: this.pieChatData,
          backgroundColor: this.pieChatBG,
          hoverBackgroundColor: this.pieChatBGHover
        }]
    };
  }

  /**
   * initGetAllMortgages() is used to get all Mortgages for creating the pieChat.
  */
  initGetAllMortgages = () => {
    this.mortgageService.getAllMortgagesGlobal(this.userSession.userId);
    this.mortgageService.allMortgagesGlobal.subscribe(data => {
      this.loans = data;

      this.pieTotalOutstanding = 0;
      this.pieTotalPaymentAmount = 0;
      for (var i = 0; i < data.length; i++) {
        this.pieTotalOutstanding = (this.pieTotalOutstanding + data[i].mortgageOutstanding);
        this.pieTotalPaymentAmount = (this.pieTotalPaymentAmount + data[i].emiAmount);
      }

      this.getPieChatDataFromMortgage();
    });
  }

  /**
   * getPieChatDataFromMortgage() is used to form pieChat data from the Mortgage loan records.
  */
  getPieChatDataFromMortgage = () => {
    this.pieChatlabels = [];
    this.pieChatData = [];
    this.pieChatBG = [];
    this.pieChatBGHover = [];
    let index = 0;

    this.loans.filter(data => {
      index++;
      this.pieChatlabels.push('Mortgage ID: ' + data.mortgageId.toString());
      this.pieChatData.push(data.mortgageOutstanding);
      this.pieChatBG.push(this.pieColorCodes[index]);
      this.pieChatBGHover.push(this.pieColorCodes[index]);
    });
  }

}
