import { Component,OnInit, AfterViewInit } from '@angular/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { environment } from "src/environments/environment";
import { RecipeService } from "../../../recipe/services/recipe.service"
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
 
  recipes;
  imgUrl = environment.imgUrl;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private recipeS:RecipeService) { }
  
  ngOnInit() {
    this.recipeS.getAllRecipes({}).subscribe(res => {
      this.recipes = res.data;
      console.log(this.recipes)
    })
  }
}
