import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../../services/blog.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.css']
})
export class CategoriesUpdateComponent implements OnInit {
  category = { name: "", slug: "", description: "",parentCategory: "" } as any;
  Categories;
  constructor(private router: Router, private actRoute: ActivatedRoute, private blogSer:BlogService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.blogSer.getUserCategories().subscribe(res => {
      // console.log(res);
      if (res.status == true) {
        this.Categories = res.data        
      }
    })
    this.blogSer.getSingleCategory(this.actRoute.snapshot.params.catId).subscribe(res=>{
      console.log(res)
      if (res.status === true) {
        this.category = res.data;
        console.log(this.category);
      }
    })
  }

  updateCategory() {
    if (this.category.parentCategory == "") {
      delete this.category.parentCategory;
    }
    // console.log(this.category);    
    this.blogSer.updateUserCategory(this.actRoute.snapshot.params.catId,this.category).subscribe(res => {
      if (res.status == true) {
        this.toastr.success("Category Update!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        this.router.navigate(["/post/categories"]);
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

}
