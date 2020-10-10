import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from "@angular/router";
import { BlogService } from "../services/blog.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  category  = { name: "", slug: "", description: "" } as any;
  parentCategory = "";
  Categories;
  constructor(private blogSer: BlogService, private toastr: ToastrService,private router:Router) { }


  ngOnInit(): void {
    this.blogSer.getUserCategories().subscribe(res => {
      if (res.status == true) {
        this.Categories = res.data
      }
    });
  }

  addCategory() {
    if (this.parentCategory !== "") {
      this.category.parentCategory = this.parentCategory
    }    
    this.blogSer.creatCategory(this.category).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit()
        this.toastr.success("Category Added!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }


  deleteCategory(catId,i) {
    console.log(catId)
    this.blogSer.deleteUserCategory(catId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.Categories.splice(i, 1);
        this.toastr.success("Category Deleted!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
     })
  }

  updateCategory(catId) {
    console.log(catId);
    this.router.navigateByUrl(['/post/category/'] + catId);
  }

}
