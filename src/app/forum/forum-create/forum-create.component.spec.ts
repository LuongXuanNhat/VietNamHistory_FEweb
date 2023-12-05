import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreateComponent } from './forum-create.component';
import { HttpClient } from '@angular/common/http';
import { PublicserviceService } from 'src/app/service/publicservice.service';

describe('ForumCreateComponent', () => {
  let component: ForumCreateComponent;
  let fixture: ComponentFixture<ForumCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicserviceService, HttpClient],
      declarations: [ForumCreateComponent],
      providers: [HttpClient]
    });
    fixture = TestBed.createComponent(ForumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
