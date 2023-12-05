import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepostComponent } from './updatepost.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('UpdatepostComponent', () => {
  let component: UpdatepostComponent;
  let fixture: ComponentFixture<UpdatepostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      declarations: [UpdatepostComponent],
      providers: [PublicserviceService, DatePipe]
    });
    fixture = TestBed.createComponent(UpdatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
