import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycategoryComponent } from './mycategory.component';
import { PublicserviceService } from '../service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

describe('MycategoryComponent', () => {
  let component: MycategoryComponent;
  let fixture: ComponentFixture<MycategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatIconModule, MatMenuModule, MatTabsModule],
      declarations: [MycategoryComponent],
      providers: [PublicserviceService, DatePipe]
    });
    fixture = TestBed.createComponent(MycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
