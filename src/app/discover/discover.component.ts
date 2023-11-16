import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { PostResponse } from '../ObjectClass/object';
import { DataService } from  '../service/datashare/data.service'
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  posts: PostResponse[] = [];

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService) {
    this.getPosts();
    
  }

  postDetail(post: PostResponse) {
    const postId = post.subId;
    this.router.navigate(['/discover', postId]);
  }
  getPosts(){
    this.service.GetPost().subscribe(
      (result: any) => {
        this.posts = result.resultObj;
        this.posts.forEach(element => {
          if(element){
            const parsedDate = parseISO(element.createdAt);
            const parsedDate2 = parseISO(element.updatedAt ?? "");

            if (!isNaN(parsedDate.getTime())) {
              element.createdAt = format(parsedDate, 'dd-MM-yyyy');
            }
            if (!isNaN(parsedDate2.getTime())) {
              element.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
            }
          }
        });
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    )
  }

}
