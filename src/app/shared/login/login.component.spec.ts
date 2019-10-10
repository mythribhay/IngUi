import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { AlertComponent } from '../alert/alert.component';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      declarations: [LoginComponent, AlertComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing login form onSubmit() with INVALID formStatus', () => {
    let mockStatus = 'INVALID';
    component.onSubmit(mockStatus);
  });

  it('Testing login form onSubmit() with VALID formStatus', () => {
    let mockStatus = 'VALID';
    component.onSubmit(mockStatus);
  });

  it('Should call closeAlertBox() and update isLoginError to False', () => {
    component.closeAlertBox();
    expect(component.isLoginError).toBeFalsy();
  });

});
