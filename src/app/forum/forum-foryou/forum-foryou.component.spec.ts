import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForyouComponent } from './forum-foryou.component';

describe('ForumForyouComponent', () => {
  let component: ForumForyouComponent;
  let fixture: ComponentFixture<ForumForyouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumForyouComponent]
    });
    fixture = TestBed.createComponent(ForumForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
