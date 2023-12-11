import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/datashare/data.service';
import { PublicserviceService } from '../service/publicservice.service';
import { SessionService } from '../service/session/session.service';
import { Category } from '../ObjectClass/object';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent{
  keyWord: string = '';
  category: Category[] = [
    {categoryname: "Dành cho bạn", url : 'foryou'},
    {categoryname: "Nổi bật", url : "top"},
    {categoryname: "Mới nhất", url : 'new'}
  ]
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService) {
    
    
  }

  search(){
    if(this.keyWord.trim()){
      this.dataService.changeKeyword(this.keyWord);
      this.router.navigate(['/searchquestion']);
    }
  }
}
