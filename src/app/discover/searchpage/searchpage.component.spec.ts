import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpageComponent } from './searchpage.component';
import { HttpClient } from '@angular/common/http';
import { PublicserviceService } from 'src/app/service/publicservice.service';

describe('SearchpageComponent', () => {
  let component: SearchpageComponent;
  let fixture: ComponentFixture<SearchpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicserviceService, HttpClient],
      declarations: [SearchpageComponent],
      providers: [HttpClient]
    });
    fixture = TestBed.createComponent(SearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
