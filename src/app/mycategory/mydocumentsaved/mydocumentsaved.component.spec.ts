import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydocumentsavedComponent } from './mydocumentsaved.component';

describe('MydocumentsavedComponent', () => {
  let component: MydocumentsavedComponent;
  let fixture: ComponentFixture<MydocumentsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MydocumentsavedComponent]
    });
    fixture = TestBed.createComponent(MydocumentsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
