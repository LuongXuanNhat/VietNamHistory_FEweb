import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-interact',
  templateUrl: './interact.component.html',
  styleUrls: ['./interact.component.css']
})
export class InteractComponent implements OnInit{
  isThumbUp: boolean | null = null;
  postId: string = '';
  formData: any;

  constructor(private service: PublicserviceService, private dataService: DataService,
    private route: ActivatedRoute, private session: SessionService){
      this.route.params.subscribe(params => {
        this.postId = params['postId'] ?? '';
      });
      this.formData = {
        PostId: this.postId,
        UserId: this.session.getUserId() ?? ''
      };
      this.service.getLike(JSON.stringify(this.formData)).subscribe(
        (result: boolean) => {
          this.isThumbUp = result;
      });
  }
  ngOnInit() {
    
  }
  toggleThumb() {
    this.service.LikeOrUnlike(this.formData).subscribe(
      (data: any) => {
        this.isThumbUp = data.resultObj;
      }
    )
  }
}
