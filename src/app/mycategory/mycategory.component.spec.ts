import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycategoryComponent } from './mycategory.component';
import { PublicserviceService } from '../service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('MycategoryComponent', () => {
  let component: MycategoryComponent;
  let fixture: ComponentFixture<MycategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ],
      declarations: [MycategoryComponent],
      providers: [PublicserviceService, DatePipe]
    });
    fixture = TestBed.createComponent(MycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
