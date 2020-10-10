import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
