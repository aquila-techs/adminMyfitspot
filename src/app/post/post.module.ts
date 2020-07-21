import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { TagsComponent } from './tags/tags.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [TagsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
