import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarbsComponent } from './add-carbs.component';

describe('AddCarbsComponent', () => {
  let component: AddCarbsComponent;
  let fixture: ComponentFixture<AddCarbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
