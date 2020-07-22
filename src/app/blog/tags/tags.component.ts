import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';  
import { Router } from "@angular/router";
import { BlogService } from "../services/blog.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  
  tag = { name: "", slug: "", description: "" };
  tags;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private blogSer: BlogService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.blogSer.getUserTags().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.tags = res.data        
      }
    })
  }

  addTag(form:NgForm) {
    console.log(this.tag)    
    this.blogSer.creatTag(this.tag).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.toastr.success("Tag Added!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deleteTag(tagId,i) {
    console.log(tagId)
    this.blogSer.deleteUserTag(tagId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.tags.splice(i, 1);
        this.toastr.success("Tag Deleted!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
     })
  }

  updateTag(tagId) {
    console.log(tagId);
    this.router.navigate(['/post/tag/'+tagId])
  }
}
