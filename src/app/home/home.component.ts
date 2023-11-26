import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { SessionService } from '../service/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/datashare/data.service';
import { PostResponse } from '../ObjectClass/object';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts!: PostResponse[];
  currentImageIndex = 0;

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService) {
      service.getRandomPost(10).subscribe(
        (data: any) => {
          this.posts = data.resultObj;
        }, (error: any) => {

        }
      )
  }
  onNextClick(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.posts.length;
  }

  onPrevClick(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.posts.length) % this.posts.length;
  }
  onInterval(): void {
    this.onNextClick();
  }
}
