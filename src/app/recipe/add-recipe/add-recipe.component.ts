import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe = {} as any;
  constructor() { }

  ngOnInit(): void {
  }
  addRecipe() {
    console.log(this.recipe)
  }
}
