import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponse } from 'src/app/ObjectClass/object';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { format, parseISO } from 'date-fns';
import { DataService } from 'src/app/service/datashare/data.service';


@Component({
  selector: 'app-cardpostmore',
  templateUrl: './cardpostmore.component.html',
  styleUrls: ['./cardpostmore.component.css']
})
export class CardpostmoreComponent {
  posts: PostResponse[] = [];
  postId: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private publicService: PublicserviceService,
    private dataService: DataService) {
    this.getPosts();
    this.route.params.subscribe(params => {
      this.postId = params['postId'] ?? '';
    });
  }
  triggerReloadDetailPage() {
    this.dataService.triggerReloadDetailPage(this.postId);
  }

  postDetail(post: PostResponse) {
    const postId = post.subId;
    this.router.navigate(['/discover', postId]);
    setTimeout(() => {
      this.triggerReloadDetailPage();
    }, 0);
  }
  getPosts(){
    this.publicService.GetPost().subscribe(
      (result: any) => {
        this.posts = result.resultObj;
        this.posts = this.posts.slice(0, 7);
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
