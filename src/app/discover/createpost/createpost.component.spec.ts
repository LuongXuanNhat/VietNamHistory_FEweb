import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepostComponent } from './createpost.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';

describe('CreatepostComponent', () => {
  let component: CreatepostComponent;
  let fixture: ComponentFixture<CreatepostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot, PublicserviceService, HttpClient],
      declarations: [CreatepostComponent]
    });
    fixture = TestBed.createComponent(CreatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
