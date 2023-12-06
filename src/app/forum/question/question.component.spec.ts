import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { AnimationService } from 'src/app/service/animations/animation.service';
import { SessionService } from 'src/app/service/session/session.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataService } from 'src/app/service/datashare/data.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, MatDialogModule, MatTooltipModule,
      MatIconModule, MatChipsModule, MatMenuModule, CKEditorModule,],
      declarations: [QuestionComponent],
      providers: [PublicserviceService, DatePipe, Location, ClipboardService, AnimationService,
      SessionService, DataService, { provide: ActivatedRoute, useValue: {} }]
    });
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
