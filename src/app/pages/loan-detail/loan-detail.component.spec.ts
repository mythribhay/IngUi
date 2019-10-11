import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoanDetailComponent } from './loan-detail.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MortgageService } from '../../services/mortgage.service';
import { IMortgage } from '../../models/mortgage';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('LoanDetailComponent', () => {
  let component: LoanDetailComponent;
  let fixture: ComponentFixture<LoanDetailComponent>;
  let mortgageService: MortgageService;

  let de: DebugElement;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbModule, HttpClientModule, RouterModule.forRoot([])],
      declarations: [LoanDetailComponent, ProfileComponent, AlertComponent],
      providers: [MortgageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mortgageService = TestBed.get(MortgageService);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initGetAllMortgages() to retrive all Mortgage from server', () => {
    const mockResponse: IMortgage = {
      'userId': 1,
      'mortgageId': 1,
      'mortgageAmount': 50000,
      'interestRate': 5,
      'mortgageRepaid': 12000,
      'mortgageOutstanding': 38000,
      'emiAmount': 2000,
      'emiDate': '5',
      'startDate': '05-05-2016',
      'endDate': '05-05-2019',
      'tenure': 50
    };

    spyOn(mortgageService, 'getAllMortgagesGlobal').and.returnValue('success');
    spyOn(mortgageService, 'allMortgagesGlobal').and.returnValue(of(mockResponse));
    component.initGetAllMortgages();
    console.log('----------------->');
    spyOn(mortgageService, 'allMortgagesGlobal').and.returnValue(of(mockResponse));



    // expect(component.mortgages[0]).toEqual(mockResponse);
    // expect(mortgageService.getAllMortgagesGlobal).toHaveBeenCalled();
    // expect(mortgageService.allMortgagesGlobal).toHaveBeenCalled();
  });

  it('should call getMortgageDetails () to retrive mortgage details based on the mortggeId', () => {
    // const mortgageId = 1;
    // const mortgages = [
    //   {
    //     "mortgageId": 1,
    //     "mortgageAmount": 150000
    //   },
    //   {
    //     "mortgageId": 1,
    //     "mortgageAmount": 150000
    //   }
    // ]
    // component.getMortgageDetails(mortgageId);
    // console.log('------------------>');
    // console.log(component.mortgage);
    // console.log('------------------>');
    //expect(component.mortgages[0]).toEqual(mockResponse);
  });
});
