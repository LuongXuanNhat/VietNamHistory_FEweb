import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { PublicserviceService } from '../service/publicservice.service';
import { HttpClient } from '@angular/common/http';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicserviceService, HttpClient],
      declarations: [NewsComponent],
      providers: [HttpClient]
    });
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
