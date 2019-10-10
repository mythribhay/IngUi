import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { GridComponent } from './grid.component';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from '../../services/user.service';
import { DialogModule } from 'primeng/dialog';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent, AlertComponent],
      imports: [HttpClientModule, RouterTestingModule, DialogModule],
      providers: [UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initGetAllUsers() to get user records and update users veriable', () => {
    component.initGetAllUsers();
    //expect(component.users.length).toBeGreaterThan(1);
  });

  it('should call deleteButton() to delete user record', () => {
    let mockId = 3;
    //component.deleteButton(mockId);
    //expect(component.isShowAlert).toBeTruthy();
  });

  it('Should call closeAlertBox() and update isLoginError to False', () => {
    component.closeAlertBox();
    expect(component.isShowAlert).toBeFalsy();
  });

});
