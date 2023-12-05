import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { ChangepasswordComponent } from './changepassword.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

describe('ChangepasswordComponent', () => {
  let component: ChangepasswordComponent;
  let fixture: ComponentFixture<ChangepasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), AuthService, HttpClient],
      declarations: [ChangepasswordComponent],
      providers: [HttpClient]
    });
    fixture = TestBed.createComponent(ChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
