import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AddProductComponent,
        data: {
          title: 'Product',
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: 'Add Prodcut' }
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
export class ProductRoutingModule { }
