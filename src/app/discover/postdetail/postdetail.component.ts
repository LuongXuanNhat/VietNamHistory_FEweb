import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostResponse } from 'src/app/ObjectClass/object';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  postData: PostResponse | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const postDataString = params['postData'];
      if (postDataString) {
        try {
          this.postData = JSON.parse(postDataString);
          if (this.postData?.createdAt) {
            this.postData.createdAt = typeof this.postData.createdAt === 'string'
                ? parseISO(this.postData.createdAt)
                : this.postData.createdAt;
        
            this.postData.createdAt = format(this.postData.createdAt, 'dd-MM-yyyy');
          }
          if(this.postData?.updatedAt){
            this.postData.updatedAt = typeof this.postData.updatedAt === 'string'
                ? parseISO(this.postData.updatedAt)
                : this.postData.updatedAt;
        
            this.postData.updatedAt = format(this.postData.updatedAt, 'dd-MM-yyyy');
          }
        } catch (error) {
          console.error('Error parsing postData:', error);
        }
      }
    });
  }
}
