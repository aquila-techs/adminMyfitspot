import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkoutComponent } from './all-workout.component';

describe('AllWorkoutComponent', () => {
  let component: AllWorkoutComponent;
  let fixture: ComponentFixture<AllWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
