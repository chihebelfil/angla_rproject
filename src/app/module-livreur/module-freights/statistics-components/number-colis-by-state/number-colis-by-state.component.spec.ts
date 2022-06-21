import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberColisByStateComponent } from './number-colis-by-state.component';

describe('NumberColisByStateComponent', () => {
  let component: NumberColisByStateComponent;
  let fixture: ComponentFixture<NumberColisByStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberColisByStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberColisByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
