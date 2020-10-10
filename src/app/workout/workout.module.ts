import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';


@NgModule({
  declarations: [WorkoutComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    FormsModule,
    PerfectScrollbarModule
  ]
})
export class WorkoutModule { }
