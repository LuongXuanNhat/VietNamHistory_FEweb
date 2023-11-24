import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostsavedComponent } from './mypostsaved.component';

describe('MypostsavedComponent', () => {
  let component: MypostsavedComponent;
  let fixture: ComponentFixture<MypostsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
