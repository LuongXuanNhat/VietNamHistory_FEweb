import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      declarations: [CarouselComponent],
      providers: [PublicserviceService]
    });
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
