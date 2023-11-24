import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PostResponse } from 'src/app/ObjectClass/object';
import { format, parseISO } from 'date-fns';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  reloadSubscription: Subscription | null = null;
  postData: PostResponse | null = null;
  posts: PostResponse[] = [];
  postId: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private publicService: PublicserviceService,
    private dataService: DataService) {
      this.route.params.subscribe(params => {
        this.postId = params['postId'] ?? '';
      });
      this.getDetail(this.postId);
      this.getPosts();
  }
 
  ngOnInit() {
    this.reloadSubscription = this.dataService.reloadDetailPage$.subscribe((postId: string | null) => {
      if (postId !== null) {
        this.getDetail(postId);
        this.router.navigate([], { relativeTo: this.route });
      }
    });
  }
  getDetail(postId: string){
    this.publicService.GetPostDetail(this.postId).subscribe(
      (data: any) => {
        this.postData = data.resultObj;
        this.dataService.changePostOfUserId(this.postData?.userShort.id ?? '');
        if(this.postData){
          const parsedDate = parseISO(this.postData.createdAt);
          const parsedDate2 = parseISO(this.postData.updatedAt ?? "");

          if (!isNaN(parsedDate.getTime())) {
            this.postData.createdAt = format(parsedDate, 'dd-MM-yyyy');
          }
          if (!isNaN(parsedDate2.getTime())) {
            this.postData.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
          }
        }
      }
    )
  }
  getPosts(){
    this.publicService.GetPost().subscribe(
      (result: any) => {
        this.posts = result.resultObj;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    )
  }
  findByTag(tagName: string){
    this.dataService.changeKeyword('#'+tagName);
      this.router.navigate(['/search-posts']);
  }
}
