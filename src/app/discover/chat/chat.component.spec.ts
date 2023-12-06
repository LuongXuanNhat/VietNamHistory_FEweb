import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, MatDialogModule, CKEditorModule,
      MatIconModule, MatMenuModule, MatTooltipModule, FormsModule, ],
      declarations: [ChatComponent],
      providers: [PublicserviceService, SessionService, DatePipe, { provide: MAT_DIALOG_DATA, useValue: {} },
       ]
    });
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
