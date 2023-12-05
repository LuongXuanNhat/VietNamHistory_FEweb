import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForyouComponent } from './forum-foryou.component';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/service/datashare/data.service';
import { SessionService } from 'src/app/service/session/session.service';
import { AnimationService } from 'src/app/service/animations/animation.service';
import { ToastrModule } from 'ngx-toastr';

describe('ForumForyouComponent', () => {
  let component: ForumForyouComponent;
  let fixture: ComponentFixture<ForumForyouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [ForumForyouComponent],
      providers: [PublicserviceService, DatePipe, DataService, SessionService, AnimationService]
    });
    fixture = TestBed.createComponent(ForumForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
