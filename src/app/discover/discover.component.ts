import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { PostResponse } from '../ObjectClass/object';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  posts: PostResponse[] = [];

  constructor(private router: Router, private service: PublicserviceService) {
    this.getPosts();
    
  }

  postDetail(postId: string) {
    const postDetailState = {
      postData: this.getPostDetail(postId)
    };
  
    this.router.navigate(['/discover', postId], { state: postDetailState });
  }
  getPostDetail(postId: string): PostResponse | undefined {
    return this.posts.find(x => x.id === postId);
  }
  getPosts(){
    this.service.GetPost().subscribe(
      (result: any) => {
        this.posts = result.resultObj;
        console.log(result)
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    )
  }

}
