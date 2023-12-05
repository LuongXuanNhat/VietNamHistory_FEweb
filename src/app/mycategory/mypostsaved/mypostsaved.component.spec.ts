import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostsavedComponent } from './mypostsaved.component';
import { ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@microsoft/signalr';

describe('MypostsavedComponent', () => {
  let component: MypostsavedComponent;
  let fixture: ComponentFixture<MypostsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrService, PublicserviceService, HttpClient],
      declarations: [MypostsavedComponent]
    });
    fixture = TestBed.createComponent(MypostsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
