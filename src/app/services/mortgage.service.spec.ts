import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MortgageService } from './mortgage.service';
import { IMortgage } from '../models/mortgage';


describe('MortgageService', () => {
  let service: MortgageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MortgageService]
    });
    service = TestBed.get(MortgageService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: MortgageService = TestBed.get(MortgageService);
    expect(service).toBeTruthy();
  });

  it('should call getMortgagesList() to retrive all the Mortgage list via GET request', () => {
    let userId = 1;
    const mockResponseData = {
      "mortgaheId": 1,
      "mortgageAmount": 50000
    };
    service.getMortgagesList(userId).subscribe(data => {
      expect(data[0]).toEqual(mockResponseData);
    });
    const mockRequest = httpMock.expectOne(`${service.apiFirstUrl}/mortgages/${userId}`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponseData);
  });

  it('should call verifyScheduleRequest() to retrive valid tenure and emiAmount via GET request', () => {
    const mockReqData = {
      "mortgaheId": 1,
      "emiAmount": 5000,
      "tenure": 50
    };
    const mockResData = {
      "mortgaheId": 1,
      "emiAmount": 4000,
      "tenure": 60
    };
    service.verifyScheduleRequest(mockReqData).subscribe(data => {
      expect(data).toEqual(mockResData);
    });
    const mockRequest = httpMock.expectOne(`${service.apiFirstUrl}/mortgages/emi`);
    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(mockResData);
  });

  it('should call modifyMortgageRequest() to modify mortgage data via POST request', () => {
    const mockReqData = {
      "mortgaheId": 1,
      "emiAmount": 5000,
      "tenure": 50
    };
    const mockResData = {
      "mortgaheId": 1,
      "emiAmount": 4000,
      "tenure": 60
    };
    service.modifyMortgageRequest(mockReqData).subscribe(data => {

    });
    const mockRequest = httpMock.expectOne(`${service.apiFirstUrl}/update`);
    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(mockResData);
  });

});
