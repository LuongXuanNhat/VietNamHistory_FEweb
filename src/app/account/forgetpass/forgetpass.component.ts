import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  constructor(private service: AuthService, public dialogRef: MatDialogRef<ForgetpassComponent>
    ,private _formBuilder: FormBuilder, private  toastr: ToastrService, private router: Router ){

  }

  email: string = '';
  pass: any;
  confirmPass: any;
  hide = true;
  code: any;
  lockUntil: Date | null = null;
  numberOfAttemptsRemaining: number = 5;
  private password: any;
  private token: any;
  step1Completed: boolean = false;
  step2Completed: boolean = false;

  firstFormGroup = this._formBuilder.group({
    email: this._formBuilder.control('', Validators.compose([Validators.required, Validators.email]))
  });
  secondFormGroup = this._formBuilder.group({
    code: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    password: this._formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,16}$')])),
    token: this._formBuilder.control(''),
    email: this._formBuilder.control(this.email)
  });
  isLinear = true;
  
  

  onNoClick(): void {
    this.dialogRef.close();
  }
  Step(){
    this.stepper.next();
  }
  GetCode(){
    if(this.firstFormGroup.valid){
      this.service.ForgetPassword(this.firstFormGroup.value.email).subscribe(
        (res: any) => {
          this.password = res.resultObj.password;
          this.toastr.info('Nhập mã xác nhận được gửi đến email của bạn');
          this.step1Completed = true;
        },
        (error: any) => {
          this.toastr.error(error.error.message);
        });
    } else {
        this.toastr.warning('Địa chỉ email không đúng!');
        return;
    }
  } 
  ConfirmCode(){
    if(this.secondFormGroup.valid){
      if(this.step2Completed == true){
        this.stepper.next();
        return;
      }
      if(this.password === this.secondFormGroup.value.code){
        this.service.ConfirmCode(this.firstFormGroup.value.email).subscribe(
          (res: any) => {
            this.token = res.resultObj.token;
            this.step2Completed = true;
            this.stepper.next();
          },
          (error: any) => {
            this.toastr.error(error.message);
          });
      } else {
        this.numberOfAttemptsRemaining--;
        this.toastr.warning('Mã xác nhận không đúng! Số lần thử còn lại là: ' + this.numberOfAttemptsRemaining);
        return;
      }
      } else {
        this.toastr.warning('Vui lòng nhập mã xác nhận!');
        return;
    }
  }  
  
  ResetPassword(){
    if(this.thirdFormGroup.valid){
      this.thirdFormGroup.value.email = this.firstFormGroup.value.email;
      this.thirdFormGroup.value.token = this.token;
      if(this.thirdFormGroup.value.password === this.confirmPass){
        this.service.ResetPassword(this.thirdFormGroup.value).subscribe(
          (res: any) => {
            this.toastr.success('Đặt lại mật khẩu thành công! Hãy quay lại đăng nhập');
            this.onNoClick();
          },
          (error: any) => {
            this.toastr.error(error.error.message);
          });
      } else {
        this.toastr.warning('Mật khẩu không khớp!');
        return;
    }
    } else {
        this.toastr.warning('Vui lòng điền đầy đủ thông tin!');
        return;
    }
  }
}

