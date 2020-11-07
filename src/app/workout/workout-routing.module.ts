import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { AllWorkoutComponent } from './all-workout/all-workout.component';
import { WorkoutComponent } from './workout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addWorkout',
        component: WorkoutComponent,
        data: {
          title: 'Add Workout',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Workout' }
          ]
        }
      },
   ]  
  },
  {
    path: '',
    children: [
      {
        path: 'addworkout',
        component: AddWorkoutComponent,
        data: {
          title: 'Add Workout',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add WorkOut' }
          ]
        }
      },
      {
        path: 'all',
        component: AllWorkoutComponent,
        data: {
          title: 'All Workouts',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'All Workouts' }
          ]
        }
      }
    ]  
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
