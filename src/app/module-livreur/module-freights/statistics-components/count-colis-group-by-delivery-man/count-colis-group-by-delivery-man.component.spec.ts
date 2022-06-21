import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountColisGroupByDeliveryManComponent } from './count-colis-group-by-delivery-man.component';

describe('CountColisGroupByDeliveryManComponent', () => {
  let component: CountColisGroupByDeliveryManComponent;
  let fixture: ComponentFixture<CountColisGroupByDeliveryManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountColisGroupByDeliveryManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountColisGroupByDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
