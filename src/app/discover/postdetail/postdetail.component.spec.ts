import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailComponent } from './postdetail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { SessionService } from 'src/app/service/session/session.service';
import { ClipboardService } from 'ngx-clipboard';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';

describe('PostdetailComponent', () => {
  let component: PostdetailComponent;
  let fixture: ComponentFixture<PostdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(),MatIconModule, MatTooltipModule, 
      MatMenuModule, MatChipsModule, MatDialogModule, ],
      declarations: [PostdetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ postId: '' }) }, 
        },
        PublicserviceService, MatDialog,
        DatePipe, SessionService, ClipboardService

      ],
    });
    fixture = TestBed.createComponent(PostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
