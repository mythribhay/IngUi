import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../../services/mortgage.service';
import { IMortgage } from '../../models/mortgage';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  userSession;
  mortgages: IMortgage[];
  cols: any[];
  ctx: {};

  constructor(private mortgageService: MortgageService) { }

  ngOnInit() {
    this.initGetUser();

    this.cols = [
      { field: 'mortgageId', header: 'ID' },
      { field: 'mortgageAmount', header: 'Principal Amount' },
      { field: 'interestRate', header: 'Interest Rate(%)' },
      { field: 'mortgageOutstanding', header: 'Outstanding' },
      { field: 'emiAmount', header: 'Payment Amount' },
      { field: 'emiDate', header: 'Payment Date' },
      { field: 'startDate', header: 'Start Date' }
    ];

    this.initGetAllMortgages();

  }

  /**
   * initGetUser() is used to get user data from localStorage
  */
  initGetUser = () => {
    this.userSession = JSON.parse(localStorage.getItem("user"));
  }

  initGetAllMortgages() {
    this.mortgageService.getAllMortgagesGlobal(this.userSession.userId);
    this.mortgageService.allMortgagesGlobal.subscribe(data => {
      this.mortgages = data;
      setTimeout(() => {
        this.ctx = { coloums: this.cols, values: this.mortgages };
      }, 500);
    })
  }


}
