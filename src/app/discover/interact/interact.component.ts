import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReportPost } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import { ReportpostComponent } from '../reportpost/reportpost.component';

@Component({
  selector: 'app-interact',
  templateUrl: './interact.component.html',
  styleUrls: ['./interact.component.css']
})
export class InteractComponent implements OnInit{
  isThumbUp: boolean | null = null;
  isSave: boolean | null = null;
  postId: string = '';
  

  constructor(private service: PublicserviceService, private dataService: DataService,
    private route: ActivatedRoute, private session: SessionService,private dialog: MatDialog,
    ){
      this.route.params.subscribe(params => {
        this.postId = params['postId'] ?? '';
      });
      this.service.getLike(this.postId, this.session.getUserId() || '').subscribe(
        (result: any) => {
            this.isThumbUp = result.resultObj;
        },
        (error: any) => {
            console.error(error);
        }
      );
      this.service.getSave(this.postId, this.session.getUserId() || '').subscribe(
        (result: any) => {
            this.isSave = result.resultObj;
        },
        (error: any) => {
            console.error(error);
        }
      );
  }
  ngOnInit() {
    
  }
  toggleThumb() {
    if(!this.session.getUserId()){
      return;
    }
    const formData = new FormData();
    formData.append('PostId', this.postId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.LikeOrUnlike(formData).subscribe(
      (data: any) => {
        this.isThumbUp = data.resultObj;
      }
    )
  }
  IsSave(){
    if(!this.session.getUserId()){
      return;
    }
    const formData = new FormData();
    formData.append('PostId', this.postId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSave(formData).subscribe(
      (data: any) => {
        this.isSave = data.resultObj;
      }
    )
  }
  
  Report(){
    this.openDialog('10ms', '10ms');
  }
  openDialog(enteranimation: any, exitanimation: any){
    const popup = this.dialog.open(ReportpostComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '900px',
      height: '500px',
      data: {
        SubId: this.postId
      }
    });
  }
}
