import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdetailComponent } from './postdetail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PublicserviceService } from 'src/app/service/publicservice.service';

describe('PostdetailComponent', () => {
  let component: PostdetailComponent;
  let fixture: ComponentFixture<PostdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient],
      declarations: [PostdetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ postId: '' }) }, 
        },
        HttpClient,
        PublicserviceService
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
