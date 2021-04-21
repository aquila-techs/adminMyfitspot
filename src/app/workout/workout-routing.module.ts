import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { AllWorkoutComponent } from './all-workout/all-workout.component';
import { ModifyWorkoutComponent } from './modify-workout/modify-workout.component';
import { WorkoutComponent } from './workout.component';

const routes: Routes = [
  {
    path: '',
    children: [
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
      },
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
        path: 'modifyworkout',
        component: ModifyWorkoutComponent,
        data: {
          title: 'Modify Workout',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Modify WorkOut' }
          ]
        }
      },
      {
        path: 'quadriceps',
        component: WorkoutComponent,
        data: {
          title: 'Add Quadriceps',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Quadriceps' }
          ]
        }
      },
      {
        path: 'glutes',
        component: WorkoutComponent,
        data: {
          title: 'Add glutes',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add glutes' }
          ]
        }
      },
      {
        path: 'hamstring',
        component: WorkoutComponent,
        data: {
          title: 'Add Hamstring',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Hamstring' }
          ]
        }
      },
      {
        path: 'chest',
        component: WorkoutComponent,
        data: {
          title: 'Add Chest',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Chest' }
          ]
        }
      },
      {
        path: 'lats',
        component: WorkoutComponent,
        data: {
          title: 'Add Lats',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Lats' }
          ]
        }
      },
      {
        path: 'shoulder',
        component: WorkoutComponent,
        data: {
          title: 'Add Shoulder',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Shoulder' }
          ]
        }
      },
      {
        path: 'biceps',
        component: WorkoutComponent,
        data: {
          title: 'Add Biceps',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Biceps' }
          ]
        }
      },
      {
        path: 'triceps',
        component: WorkoutComponent,
        data: {
          title: 'Add Triceps',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Triceps' }
          ]
        }
      },
      {
        path: 'core',
        component: WorkoutComponent,
        data: {
          title: 'Add Core',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Core' }
          ]
        }
      },
      {
        path: 'calfs',
        component: WorkoutComponent,
        data: {
          title: 'Add Calfs',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Calfs' }
          ]
        }
      },
      {
        path: 'upperTraps',
        component: WorkoutComponent,
        data: {
          title: 'Add Upper Traps',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Upper Traps' }
          ]
        }
      },
      {
        path: 'bag',
        component: WorkoutComponent,
        data: {
          title: 'Add Bag',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Bag' }
          ]
        }
      },
      {
        path: 'mobility',
        component: WorkoutComponent,
        data: {
          title: 'Add Mobility',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Mobility' }
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
