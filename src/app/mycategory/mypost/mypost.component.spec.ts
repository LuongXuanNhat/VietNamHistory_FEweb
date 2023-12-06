import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostComponent } from './mypost.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/service/datashare/data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from 'src/app/service/session/session.service';

describe('MypostComponent', () => {
  let component: MypostComponent;
  let fixture: ComponentFixture<MypostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule,MatDialogModule, ],
      declarations: [MypostComponent],
      providers: [PublicserviceService, DatePipe, DataService,
      SessionService,  { provide: MatDialogRef, useValue: {} }, 
      { provide: MAT_DIALOG_DATA, useValue: {} }]
    });
    fixture = TestBed.createComponent(MypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
