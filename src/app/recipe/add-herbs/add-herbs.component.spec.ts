import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHerbsComponent } from './add-herbs.component';

describe('AddHerbsComponent', () => {
  let component: AddHerbsComponent;
  let fixture: ComponentFixture<AddHerbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHerbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHerbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
