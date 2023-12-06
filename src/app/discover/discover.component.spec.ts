import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { PublicserviceService } from '../service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { SessionService } from '../service/session/session.service';
import { DataService } from '../service/datashare/data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), MatIconModule, MatChipsModule,
      FormsModule, ],
      declarations: [DiscoverComponent],
      providers: [PublicserviceService, DatePipe, SessionService, DataService]
    });
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
