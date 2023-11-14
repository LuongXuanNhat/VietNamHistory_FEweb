import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailComponent } from './postdetail.component';

describe('PostdetailComponent', () => {
  let component: PostdetailComponent;
  let fixture: ComponentFixture<PostdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostdetailComponent]
    });
    fixture = TestBed.createComponent(PostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
