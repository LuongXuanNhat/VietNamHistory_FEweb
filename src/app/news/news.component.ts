import { Component, OnInit } from '@angular/core';
import { PublicserviceService } from '../service/publicservice.service';
import { News } from '../ObjectClass/object';
import { ToastrService } from 'ngx-toastr';
import { format, parseISO } from 'date-fns';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{
  news!: News[];
  pagedNews: News[] = [];
  currentPage: number = 1;
  pageSize: number = 15;
  constructor(private service: PublicserviceService,private toastr: ToastrService){
        this.GetNews();
    }
  ngOnInit(): void {

  }
  GetNews() {
    this.service.GetNews().subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.news = data.resultObj; 
          this.ConvertDate();
          this.updatePagedNews();
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  ConvertDate(){
    this.news.forEach(element => {
      const parsedDate = parseISO(element.createdAt?.toString() ?? "");

    if (!isNaN(parsedDate.getTime())) {
      element.createdAt = format(parsedDate, 'dd-MM-yyyy hh:mm');
    }
    }); 
  }
  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePagedNews();
  }
  updatePagedNews() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedNews = this.news.slice(startIndex, endIndex);
  }
}
