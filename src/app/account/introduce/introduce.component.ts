import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
  constructor(private userService: UserService, private toastr: ToastrService, private fb: FormBuilder
    , private sessionService: SessionService) {
    this.form = this.fb.group({});
  }
  
  ngOnInit() {
    this.sessionService.email$.subscribe((newEmail) => {
      this.username = newEmail;
    });
    this.avatar = this.sessionService.getAvatar();
  }
  
  form: FormGroup;
  avatar: any;
  username: any;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);
    this.userService.UpdateAvatar(formData).subscribe(
      (response: string) => {
        this.userService.GetImage().subscribe(
          (data: string) => {
            if(data !== ''){
              const img = 'data:image/jpeg;base64,' + data;
              this.sessionService.setAvatar(img);
              this.avatar = img;
            }
          });
        this.toastr.success(response);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
