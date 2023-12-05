import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForyouComponent } from './forum-foryou.component';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('ForumForyouComponent', () => {
  let component: ForumForyouComponent;
  let fixture: ComponentFixture<ForumForyouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ForumForyouComponent],
      providers: [PublicserviceService, DatePipe]
    });
    fixture = TestBed.createComponent(ForumForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
