import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginComponent } from "./authentication/login/login.component";

//Guards
import { AuthRoutesAppearanceGuard } from "./guards/auth-routes-appearance.guard";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from './guards/auth.guard';
import { SuperAdminGuard } from "./guards/superAdmin.guard";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate:[AuthGuard,AdminGuard],
    children: [
      { path: '', redirectTo: '/dashboard/classic', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'recipes',
        loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'workout',
        loadChildren: () => import('./workout/workout.module').then(m => m.WorkoutModule)
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRoutesAppearanceGuard]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
