import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumNewComponent } from './forum-new.component';

describe('ForumNewComponent', () => {
  let component: ForumNewComponent;
  let fixture: ComponentFixture<ForumNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumNewComponent]
    });
    fixture = TestBed.createComponent(ForumNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
