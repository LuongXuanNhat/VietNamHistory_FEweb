import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { PostFpk, PostResponse, TagDto } from '../ObjectClass/object';
import { DataService } from  '../service/datashare/data.service'
import { format, parseISO } from 'date-fns';
import { SessionService } from '../service/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent {
  keyWord!: string | null;
  @ViewChild('innerContainer') innerContainer!: ElementRef;
  posts: PostResponse[] = [];
  tags: string[] = [];
  selectedTag: string | null = null;
  isSave: boolean | null = null;
  postFpk: PostFpk = {
    userId : this.session.getUserId() ?? '',
    postId : ''
  }
  postSaved: PostResponse[] = [];

  postNews: PostResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService) {
    this.getPosts();
    this.getTags(20);
    if(this.session.getUserId()){
      this.GetSaved();
    }
  }

  selectTag(tag: string): void {
    if (this.selectedTag === tag) {
      this.selectedTag = null;
      this.getPosts();
    } else {
      this.selectedTag = tag;
      this.service.getpostbytag(tag).subscribe(
        (result: any) => {
          this.posts = result.resultObj;
          this.updatePagedPosts();
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

  getTags(numberTag: number){
    this.service.GetTopTags(numberTag).subscribe(
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
        this.ConvertDate();
        this.updatePagedPosts();
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    )
  }
  ConvertDate() {
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
  }
  IsSave(post:PostResponse, event: Event){
    if(!this.session.getUserId()){
      this.toastr.info("Bạn cần đăng nhập!");
      return;
    }
    const formData = new FormData();
    formData.append('PostId', post.subId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSave(formData).subscribe(
      (data: any) => {
        post.isSaved = !post.isSaved;
      }
    )
    event.stopPropagation();
  }
  GetSaved(){
    this.service.GetMyPostSaved().subscribe(
      (data: any)=>{
        this.postSaved = data.resultObj;
        this.posts.forEach(element => {
          element.isSaved = this.checkSave(element);
        });
      }
    )
  }
  checkSave(post:PostResponse): boolean{
    if(this.postSaved.some(savedPost => savedPost.id === post.id)){
      post.isSaved = true;
      return true;
    }
    return false;
  }

  search(){
    if(this.keyWord?.trim()){
      this.dataService.changeKeyword(this.keyWord);
      this.router.navigate(['/searchposts']);
    }
  }
  
  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePagedPosts();
  }
  updatePagedPosts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.postNews = this.posts.slice(startIndex, endIndex);
  }
}
