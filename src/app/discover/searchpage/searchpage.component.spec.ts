import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpageComponent } from './searchpage.component';
import { HttpClient } from '@angular/common/http';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/datashare/data.service';
import { SessionService } from 'src/app/service/session/session.service';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

describe('SearchpageComponent', () => {
  let component: SearchpageComponent;
  let fixture: ComponentFixture<SearchpageComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(),
      MatIconModule, MatChipsModule, MatTooltipModule, FormsModule],
      declarations: [SearchpageComponent],
      providers: [PublicserviceService, DatePipe, DataService, SessionService]
    });
    fixture = TestBed.createComponent(SearchpageComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
