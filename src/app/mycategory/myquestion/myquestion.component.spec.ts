import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionComponent } from './myquestion.component';

describe('MyquestionComponent', () => {
  let component: MyquestionComponent;
  let fixture: ComponentFixture<MyquestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyquestionComponent]
    });
    fixture = TestBed.createComponent(MyquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
