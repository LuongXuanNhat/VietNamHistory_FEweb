import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-mypostsaved',
  templateUrl: './mypostsaved.component.html',
  styleUrls: ['./mypostsaved.component.css']
})
export class MypostsavedComponent implements OnInit{
  userId: string ;
  posts: PostResponse[] = [];

  constructor(private router: Router, private service: PublicserviceService,
    private session: SessionService, private toastr: ToastrService){
      this.userId = session.getUserId() ?? '';
      this.GetMyPost();
  }
  ngOnInit() {
  }
  GetMyPost(){
    this.service.GetMyPostSaved().subscribe(
      (data: any) => {
        this.posts = data.resultObj;
        this.ConvertDate();
      }
    ),
    (error: any) => {
      console.log(error);
    }
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
    this.router.navigate(['/discover', postId]);
  }
  IsSave(post:PostResponse, event: Event){
    const formData = new FormData();
    formData.append('PostId', post.subId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSave(formData).subscribe(
      (data: any) => {
        this.GetMyPost();
      }
    )
  }
}
