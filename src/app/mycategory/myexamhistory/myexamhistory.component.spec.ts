import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyexamhistoryComponent } from './myexamhistory.component';

describe('MyexamhistoryComponent', () => {
  let component: MyexamhistoryComponent;
  let fixture: ComponentFixture<MyexamhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyexamhistoryComponent]
    });
    fixture = TestBed.createComponent(MyexamhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
