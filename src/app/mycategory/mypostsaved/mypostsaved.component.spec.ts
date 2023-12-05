import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostsavedComponent } from './mypostsaved.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@microsoft/signalr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('MypostsavedComponent', () => {
  let component: MypostsavedComponent;
  let fixture: ComponentFixture<MypostsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      declarations: [MypostsavedComponent],
      providers: [PublicserviceService, DatePipe]
    });
    fixture = TestBed.createComponent(MypostsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
