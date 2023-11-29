import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { SessionService } from '../service/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/datashare/data.service';
import { PostResponse } from '../ObjectClass/object';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  posts!: PostResponse[];
  currentSlideIndex = 0;

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private ngZone: NgZone) {
      service.getRandomPost(10).subscribe(
        (data: any) => {
          this.posts = data.resultObj;
        }, (error: any) => {

        }
      )

  }
  ngOnInit(): void {

  }
  
}
