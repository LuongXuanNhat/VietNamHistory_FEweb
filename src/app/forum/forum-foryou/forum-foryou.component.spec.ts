import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumForyouComponent } from './forum-foryou.component';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';

describe('ForumForyouComponent', () => {
  let component: ForumForyouComponent;
  let fixture: ComponentFixture<ForumForyouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicserviceService, HttpClient],
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
