import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceComponent } from './introduce.component';
import { UserService } from 'src/app/service/user.service';
import { HttpClient } from '@angular/common/http';

describe('IntroduceComponent', () => {
  let component: IntroduceComponent;
  let fixture: ComponentFixture<IntroduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserService, HttpClient],
      declarations: [IntroduceComponent],
      providers:[HttpClient]
    });
    fixture = TestBed.createComponent(IntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
