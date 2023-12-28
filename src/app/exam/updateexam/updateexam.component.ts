import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MultipleChoiceResponseDto, QuizDto } from 'src/app/ObjectClass/object';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-updateexam',
  templateUrl: './updateexam.component.html',
  styleUrls: ['./updateexam.component.css']
})
export class UpdateexamComponent {
  examId: string | null;
  exam!: MultipleChoiceResponseDto;
  updateExamForm = this._formBuilder.group({
    Id: ['', Validators.required],
    Title: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
    Description: ['',[Validators.required, Validators.maxLength(500)]],
    Time: ['', Validators.required]
  });
  quizForms: FormGroup[] = [];

 constructor(private service: PublicserviceService, private toastr: ToastrService, private session: SessionService,
  private route: ActivatedRoute,private router: Router,private _formBuilder: FormBuilder,){
    this.examId = this.route.snapshot.paramMap.get('examId');
    this.GetDetail();
  }
  GetDetail() {
    if(this.examId){
      this.service.ExamDetail(this.examId).subscribe(
        (data: any) => {
          if(data.isSuccessed){
            this.exam = data.resultObj;
            if(this.session.getUserId() != this.exam.userShort?.id){
              this.toastr.info("Bạn không đủ quyền");
              this.router.navigate(['/home']);
            }
            this.updateExamForm.patchValue({
              Id: this.exam.id,
              Description : this.exam.description,
              Time : this.exam.workTime.toString(),
              Title: this.exam.title
            });
            this.pushData();
          } else {
            this.toastr.error("Lỗi: " + data.message);
          }
        }, (error: any) => {
          this.toastr.error("Lỗi: "+ error);
        }
      )
    }
  }
  pushData() {
    this.exam.quizs?.forEach((quiz) => {
      const quizFormGroup = this._formBuilder.group({
          id: [quiz.id,Validators.required],
          content: [quiz.content, Validators.required],
          quizAnswers: this._formBuilder.array([]),
      });
  
      const quizAnswersFormArray = quizFormGroup.get('quizAnswers') as FormArray;
      quiz.quizAnswers?.forEach((answer) => {
          quizAnswersFormArray.push(
              this._formBuilder.group({
                  id: [answer.id],
                  content: [answer.content, Validators.required],
                  isCorrect: [answer.isCorrect],
              })
          );
      });
  
      this.quizForms.push(quizFormGroup);
    });
  }
  getAnswerControl(quizIndex: number, answerIndex: number): FormControl {
    return this.quizForms[quizIndex].get(`quizAnswers.${answerIndex}.content`) as FormControl;
  }
  getIsCorrectControl(quizIndex: number, answerIndex: number): FormControl {
    return this.quizForms[quizIndex].get(`quizAnswers.${answerIndex}.isCorrect`) as FormControl;
  }
  UpdateExam(){
    const formData = new FormData();
    const createExam = this.updateExamForm;
    var time = createExam.get('Time')?.value;

    formData.append('Id', createExam.get('Id')?.value?.trim() || '');
    formData.append('Title', createExam.get('Title')?.value?.trim() || '');
    formData.append('Description', createExam.get('Description')?.value?.trim() || '');
    formData.append('WorkTime', time || '30');
    formData.append('File', '');

    this.service.UpdateExam(formData).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.toastr.success("Cập nhập bài thi thành công");
        } else {
          this.toastr.error(data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  
  toggleIsCorrect(quizIndex: number, answerIndex: number) {
    const quizFormArray = this.quizForms[quizIndex].get('quizAnswers') as FormArray;

    // Toggle the isCorrect value for the selected answer
    const answerFormGroup = quizFormArray.at(answerIndex) as FormGroup;
    const currentIsCorrect = answerFormGroup.get('isCorrect')?.value;
    answerFormGroup.patchValue({ isCorrect: !currentIsCorrect });

    // If the selected answer is marked as correct, unmark all other answers
    if (!currentIsCorrect) {
        for (let i = 0; i < quizFormArray.length; i++) {
            if (i !== answerIndex) {
                const control = quizFormArray.at(i) as FormGroup;
                control.get('isCorrect')?.setValue(false);
            }
        }
    }
  }

  updateQuiz(index: number) {
    const quizForm = this.quizForms[index];
    const quizData = this.getQuizDataFromForm(quizForm);
    console.log(quizForm.value);

    this.service.UpdateQuizOfExam(quizData).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.toastr.success("Cập nhập câu hỏi thành công");
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  getQuizDataFromForm(quizForm: FormGroup): any {
    const quizData: any = { ...quizForm.value };

    // Convert quizAnswers to an array
    quizData.quizAnswers = quizData.quizAnswers.map((answer: any) => {
      return {
          id: answer.id,
          content: answer.content,
          isCorrect: answer.isCorrect,
      };
    });
    return quizData;
  }
}
