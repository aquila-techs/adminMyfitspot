import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { AllWorkoutComponent } from './all-workout/all-workout.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QuillModule } from 'ngx-quill';
import Counter from './counter';


@NgModule({
  declarations: [WorkoutComponent,AddWorkoutComponent, AllWorkoutComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    FormsModule,
    PerfectScrollbarModule,
    NgbModule,
    AccordionModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    QuillModule.forRoot({
    })
  ]
})
export class WorkoutModule { }
