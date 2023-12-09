import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchquestionComponent } from './searchquestion.component';

describe('SearchquestionComponent', () => {
  let component: SearchquestionComponent;
  let fixture: ComponentFixture<SearchquestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchquestionComponent]
    });
    fixture = TestBed.createComponent(SearchquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
