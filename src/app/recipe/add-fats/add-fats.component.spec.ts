import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFatsComponent } from './add-fats.component';

describe('AddFatsComponent', () => {
  let component: AddFatsComponent;
  let fixture: ComponentFixture<AddFatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
