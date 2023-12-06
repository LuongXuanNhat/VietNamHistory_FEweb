import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionComponent } from './myquestion.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import { DataService } from 'src/app/service/datashare/data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('MyquestionComponent', () => {
  let component: MyquestionComponent;
  let fixture: ComponentFixture<MyquestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(),MatDialogModule, MatTooltipModule, HttpClientTestingModule,
      MatTooltipModule, MatIconModule, MatTableModule],
      declarations: [MyquestionComponent],
      providers: [PublicserviceService, SessionService, DataService, DatePipe]
    });
    fixture = TestBed.createComponent(MyquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
