import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DashboardRoutes } from './dashboard.routing';

import { Dashboard1Component } from './dashboard1/dashboard1.component';


import {
  ActivevisitComponent,
  VisitorComponent,
  ActivitypagesComponent,
  CamStatsComponent,
  CamoverComponent,
  ConversionEarningsComponent,
  ChartComponent,
  CurrencyComponent,
  MarketComponent,
  OrderComponent,
  CryptoComponent,
  TradeComponent,
  DeviceSalesComponent,
  EarningsComponent,
  EcomSalesComponent,
  EcomorderComponent,
  EcomproductComponent,
  EcomReviewComponent,
  StatsComponent,
  EmailComponent,
  Emailcompaign2Component,
  FeedsComponent,
  InfocardComponent,
  MixstatsComponent,
  MonthoverviewComponent,
  MonthscheduleComponent,
  MonthviewComponent,
  PollComponent,
  ProapprComponent,
  ProfileactivityComponent,
  ProjectComponent,
  Project2Component,
  RealdataComponent,
  RealtimevisitComponent,
  ChatComponent,
  CommentComponent,
  RpbComponent,
  RevenueviewsComponent,
  ReviewComponent,
  SalelocationComponent,
  SalesComponent,
  SocialComponent,
  TasklistComponent,
  ToplocationsComponent,
  TopreferralsComponent,
  TopsellComponent,
  UserprofileComponent,
  WeatherheaderComponent,
  WeathercardComponent,
  WeekpollComponent
} from './dashboard-components';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    RouterModule.forChild(DashboardRoutes),
    PerfectScrollbarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    Dashboard1Component,
    ActivevisitComponent,
    VisitorComponent,
    ActivitypagesComponent,
    CamStatsComponent,
    CamoverComponent,
    ConversionEarningsComponent,
    ChartComponent,
    CurrencyComponent,
    MarketComponent,
    OrderComponent,
    CryptoComponent,
    TradeComponent,
    DeviceSalesComponent,
    EarningsComponent,
    EcomSalesComponent,
    EcomorderComponent,
    EcomproductComponent,
    EcomReviewComponent,
    StatsComponent,
    EmailComponent,
    Emailcompaign2Component,
    FeedsComponent,
    InfocardComponent,
    MixstatsComponent,
    MonthoverviewComponent,
    MonthscheduleComponent,
    MonthviewComponent,
    PollComponent,
    ProapprComponent,
    ProfileactivityComponent,
    ProjectComponent,
    Project2Component,
    RealdataComponent,
    RealtimevisitComponent,
    ChatComponent,
    CommentComponent,
    RpbComponent,
    RevenueviewsComponent,
    ReviewComponent,
    SalelocationComponent,
    SalesComponent,
    SocialComponent,
    TasklistComponent,
    ToplocationsComponent,
    TopreferralsComponent,
    TopsellComponent,
    UserprofileComponent,
    WeatherheaderComponent,
    WeathercardComponent,
    WeekpollComponent
  ]
})
export class DashboardModule {}
