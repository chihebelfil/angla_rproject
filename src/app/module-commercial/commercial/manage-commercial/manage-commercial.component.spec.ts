import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommercialComponent } from './manage-commercial.component';

describe('ManageCommercialComponent', () => {
  let component: ManageCommercialComponent;
  let fixture: ComponentFixture<ManageCommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
