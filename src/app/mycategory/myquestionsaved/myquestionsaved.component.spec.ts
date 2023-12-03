import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionsavedComponent } from './myquestionsaved.component';

describe('MyquestionsavedComponent', () => {
  let component: MyquestionsavedComponent;
  let fixture: ComponentFixture<MyquestionsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyquestionsavedComponent]
    });
    fixture = TestBed.createComponent(MyquestionsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
