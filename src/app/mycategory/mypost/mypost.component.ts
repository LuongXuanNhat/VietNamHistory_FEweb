import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepostComponent } from 'src/app/discover/updatepost/updatepost.component';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css'],
})
export class MypostComponent implements OnInit{
  userId: string ;
  dataSource = new MatTableDataSource<PostResponse>([]);
  posts: PostResponse[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['image', 'title', 'createdAt', 'updatedAt','viewNumber', 'likeNumber', 'commentNumber', 'saveNumber'];

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private dialog: MatDialog){
      this.userId = session.getUserId() ?? '';
      this.GetMyPost();
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  GetMyPost(){
    this.service.GetMyPost().subscribe(
      (data: any) => {
        this.posts = data.resultObj;
        this.ConvertDate();
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.sort = this.sort;
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
  updatePost(post: PostResponse){
    this.dataService.changeSubId(post.subId);
    this.openDialogUpdatePost('100ms', '600ms');
  }
  openDialogUpdatePost(enteranimation: any, exitanimation: any){
    const popup = this.dialog.open(UpdatepostComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '60%'
    });
  }
  deletePost(post: PostResponse){
    this.service.DeletePost(post.id).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.toastr.success("Xóa bài thành công");
          window.location.reload();
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
}
