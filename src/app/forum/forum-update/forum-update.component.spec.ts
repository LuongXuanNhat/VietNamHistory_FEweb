import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumUpdateComponent } from './forum-update.component';

describe('ForumUpdateComponent', () => {
  let component: ForumUpdateComponent;
  let fixture: ComponentFixture<ForumUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumUpdateComponent]
    });
    fixture = TestBed.createComponent(ForumUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
