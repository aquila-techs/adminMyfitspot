import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BlogService } from '../services/blog.service';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  page = 1;
  collSize = 0;
  numOfItems = 10;

  posts;
  constructor(private router:Router, private actRout: ActivatedRoute,private blogSer:BlogService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.page = parseInt(qparams.get('page'));
      console.log(this.page);
      this.blogSer.getAllPosts({page:this.page,numOfPosts:this.numOfItems}).subscribe(res => {
        console.log(res)
        if (res.status === true) {
          this.posts = res.data;
          this.collSize = res.totalPosts;
        }
      })
    })
  }


  pagination(val) {
    this.router.navigate([], {
      queryParams: { page: (val) ? val : 1 },
      queryParamsHandling: 'merge'
    });
  }


}
