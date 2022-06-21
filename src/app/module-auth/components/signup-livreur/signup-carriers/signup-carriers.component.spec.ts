import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCarriersComponent } from './signup-carriers.component';

describe('SignupCarriersComponent', () => {
  let component: SignupCarriersComponent;
  let fixture: ComponentFixture<SignupCarriersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupCarriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCarriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
