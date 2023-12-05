import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{
  posts!: PostResponse[];
  currentSlideIndex = 0;
  constructor(private router: Router, private service: PublicserviceService,
    private session: SessionService, private toastr: ToastrService) {
      this.getposts();
  }
  getposts() {
    this.service.getRandomPost(0).subscribe(
      (data: any) => {
        this.posts = data.resultObj;
      }, (error: any) => {

      }
    )
  }
  ngOnInit(): void {
    this.startAutoPlay();
  }
  startAutoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Chuyển đổi ảnh mỗi 5 giây
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.posts.length;
  }
  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }
}
