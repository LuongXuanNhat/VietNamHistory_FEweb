import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { PublicserviceService } from '../service/publicservice.service';
import { HttpClient } from '@angular/common/http';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicserviceService, HttpClient],
      declarations: [DiscoverComponent]
    });
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
