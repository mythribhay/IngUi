import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './shared/login/login.component';
import { AlertComponent } from './shared/alert/alert.component';
import { GridComponent } from './shared/grid/grid.component';
import { ProfileComponent } from './shared/profile/profile.component';

import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LoanDetailComponent } from './pages/loan-detail/loan-detail.component';

import { UserService } from './services/user.service';
import { MortgageService } from './services/mortgage.service';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserDashboardComponent,
    LoanDetailComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AlertComponent,
    GridComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartModule
  ],
  providers: [UserService, MortgageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
