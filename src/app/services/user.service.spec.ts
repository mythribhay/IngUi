import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IUsers } from '../models/users';

import { UserService } from './user.service';


describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [UserService]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('shouls call getUserDetails() to retrive user detail via GET request', () => {
    let userId = 1;
    const mockResponseData: IUsers = {
      "userId": 1,
      "userName": "Tushar",
      "email": "tushar82das@gmail.com",
      "dob": "12-06-1989",
      "contact": "7377163666",
      "address": "Bangalore"
    };
    service.getUserDetails(userId).subscribe(user => {
      expect(user).toEqual(mockResponseData);
    });
    const mockRequest = httpMock.expectOne(`${service.apiFirstUrl}/users/${userId}`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockResponseData);
  })


});
