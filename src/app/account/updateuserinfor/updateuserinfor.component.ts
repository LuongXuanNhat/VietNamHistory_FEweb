import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-updateuserinfor',
  templateUrl: './updateuserinfor.component.html',
  styleUrls: ['./updateuserinfor.component.css']
})


export class UpdateuserinforComponent implements OnInit {
  constructor(private builder: FormBuilder, private  toastr: ToastrService,private userService: UserService){

  }
  ngOnInit() {
    this.GetUserInfor();
    
  }

  isEditMode: boolean = false;
  initialUserData: any;

  UserName: any;
  Fullname: any;
  Gender:   any;
  DateOfBirth: any;
  PhoneNumber: any;
  Introduction:any;

  userform = this.builder.group({
    Email: this.builder.control('', Validators.required),
    Fullname: this.builder.control('') ,
    Sex: this.builder.control(''),
    Gender: this.builder.control(0),
    DateOfBirth: this.builder.control(new Date()),
    PhoneNumber: this.builder.control(''),
    Introduction: this.builder.control(''),
  })
  
  GetUserInfor(){
    this.userService.GetUserDetail().subscribe( 
      (res: any) => {
        const data = res.resultObj;
        this.userform.patchValue({
          Email: data.email,
          Fullname: data.fullname,
          DateOfBirth: data.dateOfBirth,
          PhoneNumber: data.phoneNumber,
          Introduction: data.introduction,
          Gender: data.gender,
          Sex: this.CheckGender(data.gender)
        });
        this.UserName = data.email;
        this.Fullname = data.fullname;
        this.DateOfBirth = data.dateOfBirth;
        this.Gender = this.CheckGender(data.gender);
        this.Introduction = data.introduction;
        this.PhoneNumber = data.phoneNumber;
      },
      (error: any) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }
  CheckGender(gender: number){
    if(gender == 0){
      return 'Nam';
    } else if(gender == 1){
      return 'Nữ';
    } else {
      return 'Không';
    }
  }
  ResvertGender(){
    const sex = this.userform.get('Sex');
    const gender = this.userform.get('Gender');
    if(sex && gender){
      if(sex.value === 'Nam'){
        gender.setValue(0);
      } else if(sex.value === "Nữ"){
        gender.setValue(1)
      }
      else {
        gender.setValue(2)
      }
    }
  }
  cancelEdit() {
    // Reset form data to the initial data
    this.userform.patchValue({
      Email: this.UserName,
      Fullname: this.Fullname,
      DateOfBirth: this.DateOfBirth,
      PhoneNumber: this.PhoneNumber,
      Introduction: this.Introduction,
      Sex: this.Gender
    });
  }

  toggleEditMode() {
    if(this.isEditMode){
      this.cancelEdit();
      this.isEditMode = !this.isEditMode;
    } else {
      this.isEditMode = !this.isEditMode;
    }
  }

  updateuserinfor(){
    this.ResvertGender();
    this.userService.UpdateUser(this.userform.value).subscribe( 
      (res: any) => {
        const data = res.resultObj;
        this.userform.patchValue({
          Email: data.email,
          Fullname: data.fullname,
          Gender: data.Gender,
          DateOfBirth: data.dateOfBirth,
          PhoneNumber: data.phoneNumber,
          Introduction: data.introduction
        });
        this.UserName = data.email;
        this.Fullname = data.fullname;
        this.DateOfBirth = data.dateOfBirth;
        this.Gender = data.gender;
        this.Introduction = data.introduction;
        this.PhoneNumber = data.phoneNumber;
      },
      (error: any) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
    this.isEditMode = false;
  }
  


}
