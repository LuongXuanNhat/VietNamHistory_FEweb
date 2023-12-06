import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import { InjectionToken } from '@angular/core';
import { PublicserviceService } from '../service/publicservice.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../service/datashare/data.service';
import { SessionService } from '../service/session/session.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, MatTabsModule, MatIconModule,
      RouterModule, ],
      declarations: [ForumComponent], 
      providers: [PublicserviceService,{ provide: MatDialogRef, useValue: {} }, DataService, 
        SessionService, DatePipe, { provide: ActivatedRoute, useValue: {} }],

    });
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
