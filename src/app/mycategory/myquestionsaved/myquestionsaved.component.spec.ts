import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionsavedComponent } from './myquestionsaved.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyquestionsavedComponent', () => {
  let component: MyquestionsavedComponent;
  let fixture: ComponentFixture<MyquestionsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), MatIconModule, MatTooltipModule, HttpClientTestingModule, ToastrModule.forRoot(),
      MatDialogModule, RouterTestingModule],
      declarations: [MyquestionsavedComponent],
      providers: [PublicserviceService, ]
    });
    fixture = TestBed.createComponent(MyquestionsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
