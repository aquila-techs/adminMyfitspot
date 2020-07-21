import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { AddCarbsComponent } from './add-carbs/add-carbs.component';
import { AddFatsComponent } from './add-fats/add-fats.component';
import { AddFruitComponent } from './add-fruit/add-fruit.component';
import { AddHerbsComponent } from './add-herbs/add-herbs.component';
import { AddProteinComponent } from './add-protein/add-protein.component';
import { AddVegetablesComponent } from './add-vegetables/add-vegetables.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addrecipe',
        component: AddRecipeComponent,
        data: {
          title: 'Add Recipe',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Recipe' }
          ]
        }
      },
      {
        path: 'addcarbs',
        component: AddCarbsComponent,
        data: {
          title: 'Add Carbs',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Carbs' }
          ]
        }
      },
      {
        path: 'addfats',
        component: AddFatsComponent,
        data: {
          title: 'Add Fats',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Fats' }
          ]
        }
      },
      {
        path: 'addfruits',
        component: AddFruitComponent,
        data: {
          title: 'Add Fruits',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Fruits' }
          ]
        }
      },
      {
        path: 'addherbs',
        component: AddHerbsComponent,
        data: {
          title: 'Add Herbs',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Herbs' }
          ]
        }
      },
      {
        path: 'addprotein',
        component: AddProteinComponent,
        data: {
          title: 'Add Protein',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Protein' }
          ]
        }
      },
      {
        path: 'addvegetables',
        component: AddVegetablesComponent,
        data: {
          title: 'Add Vegetables',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Vegetables' }
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
export class RecipeRoutingModule { }
