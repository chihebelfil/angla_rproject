import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeliveryManComponent } from './manage-delivery-man.component';

describe('ManageDeliveryManComponent', () => {
  let component: ManageDeliveryManComponent;
  let fixture: ComponentFixture<ManageDeliveryManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDeliveryManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
