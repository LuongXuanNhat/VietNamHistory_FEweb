import { Component } from '@angular/core';
import { Category } from '../ObjectClass/object';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { SessionService } from '../service/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/datashare/data.service';

@Component({
  selector: 'app-mycategory',
  templateUrl: './mycategory.component.html',
  styleUrls: ['./mycategory.component.css']
})
export class MycategoryComponent {
  objectList: Category[] = [
    { categoryname: 'Bài Viết', url: 'post' },
    { categoryname: 'Bài học', url: 'lesson' },
    { categoryname: 'Bài tập', url: 'exercise' },
    { categoryname: 'Câu Hỏi', url: 'question' },
    { categoryname: 'Tài liệu', url: 'document' },
    
  ];
  defaultLink = this.objectList[0].url;
  constructor(private router: Router, private sessionService: SessionService){

  }
  isCheckAdmin(){
    return this.sessionService.getRole() === 'admin'
  }
}
