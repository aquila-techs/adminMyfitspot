import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BlogRoutingModule } from './blog-routing.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { TagsComponent } from './tags/tags.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesUpdateComponent } from './categories/categories-update/categories-update.component';
import { UpdateComponent } from './tags/update/update.component';


@NgModule({
  declarations: [AllPostsComponent, TagsComponent, CategoriesComponent, CategoriesUpdateComponent, UpdateComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
