import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopComponent } from './forum-top.component';

describe('ForumTopComponent', () => {
  let component: ForumTopComponent;
  let fixture: ComponentFixture<ForumTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumTopComponent]
    });
    fixture = TestBed.createComponent(ForumTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
