import { Component } from '@angular/core';
import { PublicserviceService } from '../service/publicservice.service';
import { News } from '../ObjectClass/object';
import { ToastrService } from 'ngx-toastr';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  news!: News[];

  constructor(private service: PublicserviceService,private toastr: ToastrService){
        this.GetNews();
    }
  GetNews() {
    this.service.GetNews().subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.news = data.resultObj; 
          this.ConvertDate();
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
}
