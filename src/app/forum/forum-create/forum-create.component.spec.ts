import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreateComponent } from './forum-create.component';

describe('ForumCreateComponent', () => {
  let component: ForumCreateComponent;
  let fixture: ComponentFixture<ForumCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumCreateComponent]
    });
    fixture = TestBed.createComponent(ForumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
