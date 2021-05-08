import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlcoholicBeveragesComponent } from './add-alcoholic-beverages.component';

describe('AddAlcoholicBeveragesComponent', () => {
  let component: AddAlcoholicBeveragesComponent;
  let fixture: ComponentFixture<AddAlcoholicBeveragesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlcoholicBeveragesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlcoholicBeveragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
