import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { ToastrService} from 'ngx-toastr'
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  isEditMode = false;
  hide = true;
  constructor(private builder: FormBuilder, private  toastr: ToastrService,
    private service: AuthService){
      this.passform.patchValue({
        Email: sessionStorage.getItem('email')
      });
  }
  passform = this.builder.group({
    Email: this.builder.control('', Validators.required),
    Password: this.builder.control('', Validators.required),
    Confirm: this.builder.control(''),
    NewPassword: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-/]).{6,16}$')])),
  })
  toggleEditMode() {
    if(this.isEditMode){
      this.cancelEdit();
      this.isEditMode = !this.isEditMode;
    } else {
      this.isEditMode = !this.isEditMode;
    }
  }
  cancelEdit() {
    this.passform.patchValue({
      Password: "",
      NewPassword: "",
      Confirm: ""
    });
  }
  changepass(){
    if(this.passform.valid){
      if(this.passform.value.NewPassword === this.passform.value.Confirm){
        this.service.ChangePassword(this.passform.value).subscribe(
          (res: any) => {
              const resultObj = res.resultObj;
              this.toastr.success('Thay đổi mật khẩu thành công');
              this.cancelEdit();
          },
          (error: any) => {
            const message = error.error.message; 
            if(message == null){
              this.toastr.error("Lỗi kết nối đến server! Xin lỗi vì sự cố này");
            } else {
              this.toastr.error(message);
            }
          }
        );
      } else {
        this.toastr.warning('Mật khẩu mới không khớp!')
      }
    } else {
      const pass = this.passform.get('NewPassword') ?? null;
      if (pass && pass.hasError('pattern')) {
        this.toastr.warning("Ví dụ: Manh5/",'Mật khẩu ít nhất phải có 6 ký tự, bao gồm: Hoa, thường, số và ký tự đặc biệt',{
          timeOut: 5000
        });
      } else {
        this.toastr.warning('Vui lòng nhập đầy đủ thông tin!');
      }
    }
  }
}
