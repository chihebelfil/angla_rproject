import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFreightsComponent } from './signup-freights.component';

describe('SignupFreightsComponent', () => {
  let component: SignupFreightsComponent;
  let fixture: ComponentFixture<SignupFreightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFreightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFreightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
