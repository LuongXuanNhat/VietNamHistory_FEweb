import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycategoryComponent } from './mycategory.component';
import { PublicserviceService } from '../service/publicservice.service';
import { HttpClient } from '@angular/common/http';

describe('MycategoryComponent', () => {
  let component: MycategoryComponent;
  let fixture: ComponentFixture<MycategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicserviceService, HttpClient],
      declarations: [MycategoryComponent],
      providers: [HttpClient]
    });
    fixture = TestBed.createComponent(MycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
