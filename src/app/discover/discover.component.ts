import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { PostResponse, TagDto } from '../ObjectClass/object';
import { DataService } from  '../service/datashare/data.service'
import { format, parseISO } from 'date-fns';
import { HammerGestureConfigComponent } from '../hammer-gesture-config/hammer-gesture-config.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  providers: [HammerGestureConfigComponent],
})
export class DiscoverComponent  {
  @ViewChild('innerContainer') innerContainer!: ElementRef;
  posts: PostResponse[] = [];
  tags: string[] = [];
  selectedTag: string | null = null;

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService) {
    this.getPosts();
    this.getTags();
  }

  selectTag(tag: string): void {
    if (this.selectedTag === tag) {
      this.selectedTag = null;
    } else {
      this.selectedTag = tag;
      this.service.getpostbytag(tag).subscribe(
        (result: any) => {
          console.log(result.resultObj);
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

  getTags(){
    this.service.GetTags(10).subscribe(
      (data: any) => {
        this.tags = data.resultObj;
      }
    )
  }
  scrollLeft() {
    if (this.innerContainer) {
        this.innerContainer.nativeElement.scrollLeft -= 900; // điều chỉnh giá trị theo yêu cầu
    }
  }
  scrollRight() {
      if (this.innerContainer) {
          this.innerContainer.nativeElement.scrollLeft += 900; // điều chỉnh giá trị theo yêu cầu
      }
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
