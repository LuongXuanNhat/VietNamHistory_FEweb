import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { format, parseISO } from 'date-fns';
import { SessionService } from 'src/app/service/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit{
  @ViewChild('innerContainer') innerContainer!: ElementRef;
  keyWord: string = '';
  posts: PostResponse[] = [];
  tags: string[] = [];
  countResult: number = 0;
  postSaved: PostResponse[] = [];
  isSave: boolean | null = null;
  selectedTag: string | null = null;

  postNews: PostResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 12;

  constructor(private router: Router,private service: PublicserviceService,private route: ActivatedRoute
    , private dataService: DataService,private session: SessionService,private toastr: ToastrService){
    this.getTags(20);
  }
  ngOnInit(): void {
    this.dataService.currentKeyword.subscribe(keyword => {
      this.keyWord = keyword ?? this.keyWord;
      this.findPost();
    });
  }

  findPost(){
    if(!this.containsOnlySpaces(this.keyWord)){
      this.service.postSearch(this.keyWord).subscribe(
        (data: any)=>{
          this.posts = data.resultObj;
          this.updatePagedPosts();
          if(this.session.getUserId()){
            this.GetSaved();
          }
          this.ConvertDate();
          this.countResult = this.posts.length;
        }
      )
    }
  }
  search(){
    if(!this.containsOnlySpaces(this.keyWord)){
      this.service.postSearch(this.keyWord).subscribe(
        (data: any)=>{
          this.posts = data.resultObj;
          this.updatePagedPosts();
          if(this.session.getUserId()){
            this.GetSaved();
          }
          this.countResult = this.posts.length;
          this.ConvertDate();
        }
      )
    }
    this.router.navigate(['/discover']);
  }
  containsOnlySpaces(str: string): boolean {
    const trimmedStr = str.trim();
    return trimmedStr === '';
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
  getPosts(){
    this.service.GetPost().subscribe(
      (result: any) => {
        this.posts = result.resultObj;
        this.updatePagedPosts();
        if(this.posts.length > 0){
          this.ConvertDate();
        }
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
  postDetail(post: PostResponse) {
    const postId = post.subId;
    this.dataService.changeKeyword(this.keyWord);
    this.router.navigate(['/discover', postId]);
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
