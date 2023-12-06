import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostsavedComponent } from './mypostsaved.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@microsoft/signalr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { SessionService } from 'src/app/service/session/session.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

describe('MypostsavedComponent', () => {
  let component: MypostsavedComponent;
  let fixture: ComponentFixture<MypostsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, MatDialogModule, MatTooltipModule, MatIconModule, ],
      declarations: [MypostsavedComponent],
      providers: [PublicserviceService, DatePipe, SessionService]
    });
    fixture = TestBed.createComponent(MypostsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
