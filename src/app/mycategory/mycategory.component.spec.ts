import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycategoryComponent } from './mycategory.component';

describe('MycategoryComponent', () => {
  let component: MycategoryComponent;
  let fixture: ComponentFixture<MycategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycategoryComponent]
    });
    fixture = TestBed.createComponent(MycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
