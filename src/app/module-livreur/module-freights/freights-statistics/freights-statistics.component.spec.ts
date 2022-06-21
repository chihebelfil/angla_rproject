import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightsStatisticsComponent } from './freights-statistics.component';

describe('FreightsStatisticsComponent', () => {
  let component: FreightsStatisticsComponent;
  let fixture: ComponentFixture<FreightsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
