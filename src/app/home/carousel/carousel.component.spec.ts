import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [ToastrService, PublicserviceService, HttpClient],
      declarations: [CarouselComponent]
    });
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
