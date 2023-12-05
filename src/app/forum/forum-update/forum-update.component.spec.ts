import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumUpdateComponent } from './forum-update.component';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('ForumUpdateComponent', () => {
  let component: ForumUpdateComponent;
  let fixture: ComponentFixture<ForumUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ForumUpdateComponent],
      providers: [PublicserviceService, DatePipe]
    });
    fixture = TestBed.createComponent(ForumUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
