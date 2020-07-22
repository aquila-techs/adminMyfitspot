import { Component,OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BlogService } from "../../../blog/services/blog.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  imgUrl = environment.imgUrl;
  posts;
  constructor(private blogS:BlogService) { }
  ngOnInit() {
    this.blogS.getAllPosts({}).subscribe(res => {
      console.log(res)
      this.posts = res.data
    })
  }
}
