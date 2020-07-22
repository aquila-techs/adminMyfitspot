import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../../services/blog.service";
import { ToastrService } from 'ngx-toastr';
  
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  constructor(private router: Router, private actRoute: ActivatedRoute, private blogSer:BlogService, private toastr: ToastrService) { }
  tag = { name: "", slug: "", description: "" } as any;
  
  ngOnInit(): void {
    console.log(this.actRoute.snapshot.params.tagId);
    this.blogSer.getSingleTag(this.actRoute.snapshot.params.tagId).subscribe(res=>{
      console.log(res)
      if (res.status === true) {
        this.tag = res.data
      }
    })
  }

  updateTag() {
    this.blogSer.updateUserTag(this.actRoute.snapshot.params.tagId, this.tag).subscribe(res => {
      console.log(res)
      if (res.status == true) {
        this.toastr.success("Tag Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        this.router.navigate(['/post/tags']);
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
    
  }

}
