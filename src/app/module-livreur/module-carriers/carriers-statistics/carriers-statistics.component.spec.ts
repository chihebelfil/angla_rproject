import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriersStatisticsComponent } from './carriers-statistics.component';

describe('CarriersStatisticsComponent', () => {
  let component: CarriersStatisticsComponent;
  let fixture: ComponentFixture<CarriersStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarriersStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriersStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
