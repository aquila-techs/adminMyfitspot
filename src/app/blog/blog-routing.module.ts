import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { CategoriesUpdateComponent } from './categories/categories-update/categories-update.component';
import { UpdateComponent } from './tags/update/update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: AllPostsComponent,
        data: {
          // title: 'Posts',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'All Posts' }
          ]
        }
      },
   ]  
  },
  {
  path: '',
  children: [
    {
      path: 'categories',
      component: CategoriesComponent,
      data: {
        // title: 'Categories',
        urls: [
          { title: 'Posts', url: '/post/all' },
          { title: 'All Categories' }
        ]
      }
    },
 ]  
  },
  {
    path: '',
    children: [
      {
        path: 'category/:catId',
        component: CategoriesUpdateComponent,
        data: {
          // title: 'Tags',
          urls: [
            { title: 'Categories', url: '/post/categories' },
            { title: 'Update Category' }
          ]
        }
      },
  ]  
 },
    {
    path: '',
    children: [
      {
        path: 'tags',
        component: TagsComponent,
        data: {
          // title: 'Tags',
          urls: [
            { title: 'Posts', url: '/post/all' },
            { title: 'All Tags' }
          ]
        }
      },
   ]  
  },
     {
   path: '',
   children: [
     {
       path: 'tag/:tagId',
       component: UpdateComponent,
       data: {
         // title: 'Tags',
         urls: [
           { title: 'Tags', url: '/post/tags' },
           { title: 'Update Tag' }
         ]
       }
     },
  ]  
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
