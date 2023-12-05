import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailComponent } from './postdetail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PostdetailComponent', () => {
  let component: PostdetailComponent;
  let fixture: ComponentFixture<PostdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostdetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ postId: '' }) }, 
        }
      ],
    });
    fixture = TestBed.createComponent(PostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
