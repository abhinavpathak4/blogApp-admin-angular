import { Component, OnInit } from '@angular/core';
import { Blog } from '../iterfaces/blog';
import { BlogsService } from '../services/blog.service';
import { Comments } from '../iterfaces/comments';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blogList : Blog[] = [];
  comments : Comment[] = [] ;
  changedBlogsList : Blog[] = [];
  constructor(private blogService : BlogsService){}

  ngOnInit(): void {
      this.blogService.getBlogs().subscribe(
        (resp) => {
          this.blogList = resp;
        }
      )
  }

  getCommentsForPost(blog : Blog){
    return blog.comments;
  }

  updateChanges(){
    console.log(this.changedBlogsList);
    
    
      this.blogService.updatePostsData(this.changedBlogsList).subscribe(
        (response) => {
          console.log(response);
          
          console.log(response.body);
        }
      )
  }

  toggleCommentStatus(comment: Comments, blog: Blog) {
    comment.approved = !comment.approved;
    const existingBlogIndex = this.changedBlogsList.findIndex(existingBlog => existingBlog.id === blog.id);
    if (existingBlogIndex !== -1) {
        this.changedBlogsList[existingBlogIndex] = blog;
    } else {
        this.changedBlogsList.push(blog);
    } 
}

togglePostStatus(blog: Blog) {
  blog.featured = !blog.featured;
  const existingBlogIndex = this.changedBlogsList.findIndex(existingBlog => existingBlog.id === blog.id);
  if (existingBlogIndex !== -1) {
      this.changedBlogsList[existingBlogIndex] = blog;
  } else {
      this.changedBlogsList.push(blog);
  } 
}

}
