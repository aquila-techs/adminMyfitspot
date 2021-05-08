import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeRoutingModule } from './recipe-routing.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AddProteinComponent } from './add-protein/add-protein.component';
import { AddFruitComponent } from './add-fruit/add-fruit.component';
import { AddVegetablesComponent } from './add-vegetables/add-vegetables.component';
import { AddCarbsComponent } from './add-carbs/add-carbs.component';
import { AddFatsComponent } from './add-fats/add-fats.component';
import { AddHerbsComponent } from './add-herbs/add-herbs.component';
import { AddAlcoholicBeveragesComponent } from './add-alcoholic-beverages/add-alcoholic-beverages.component';


@NgModule({
  declarations: [AddRecipeComponent, AddProteinComponent, AddFruitComponent, AddVegetablesComponent, AddCarbsComponent, AddFatsComponent, AddHerbsComponent, AddAlcoholicBeveragesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RecipeRoutingModule,
    PerfectScrollbarModule,
  ]
})
export class RecipeModule { }
