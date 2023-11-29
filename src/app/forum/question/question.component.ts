import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  idQuestion!: string;
  question: PostResponse | null = null;
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private route: ActivatedRoute,){
      this.route.params.subscribe(params => {
        this.idQuestion = params['id'] ?? '';
      });
      this.GetQuestion();
  }
  ngOnInit() {
    
  }
   GetQuestion() {
    this.service.GetQuestionDetail(this.idQuestion).subscribe(
      (data: any) => {
        this.question = data.resultObj;
      }, (error: any) => {
        this.toastr.error("Lỗi: " + error);
      }
    )
  }
  findByTag(tagName: string){
    this.dataService.changeKeyword('#'+tagName);
      this.router.navigate(['/search-posts']);
  }
  
}
