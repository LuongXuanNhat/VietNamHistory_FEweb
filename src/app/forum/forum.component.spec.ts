import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import { InjectionToken } from '@angular/core';
import { PublicserviceService } from '../service/publicservice.service';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [ ],
      declarations: [ForumComponent],
      providers: [InjectionToken, PublicserviceService]
    });
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
