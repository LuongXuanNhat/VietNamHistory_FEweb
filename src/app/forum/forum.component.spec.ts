import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import { InjectionToken } from '@angular/core';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [InjectionToken, ],
      declarations: [ForumComponent]
    });
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
