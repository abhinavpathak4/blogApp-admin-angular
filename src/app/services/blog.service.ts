import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Blog } from '../iterfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
 
  private selectedBlogSource = new BehaviorSubject<Blog | null>(null);
  selectedBlog$ = this.selectedBlogSource.asObservable();

  setSelectedBlog(blog: Blog) {
    this.selectedBlogSource.next(blog);
  }


  constructor(private http : HttpClient) {
   }

  // add the blog post and later post comments to the post
  addBlogPost(post: any): Observable<HttpResponse<string>>{
    return this.http.post(environment.POST_BLOG,post, {observe: 'response', responseType: 'text'});
  }

  // method to get all the blog post 
  // then we will display them under their specific categories
  getBlogs():Observable<Blog[]>{
    return this.http.get<Blog[]>(environment.GET_BLOGS)
  }
  
  updatePostsData(list : Blog[]){
    console.log(list);
    return this.http.post(environment.UPDATE_BLOG,list, {observe: 'response',responseType:'text'});
  }
}
