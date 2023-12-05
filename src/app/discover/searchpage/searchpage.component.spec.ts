import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpageComponent } from './searchpage.component';
import { HttpClient } from '@angular/common/http';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('SearchpageComponent', () => {
  let component: SearchpageComponent;
  let fixture: ComponentFixture<SearchpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SearchpageComponent],
      providers: [PublicserviceService, DatePipe]
    });
    fixture = TestBed.createComponent(SearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
