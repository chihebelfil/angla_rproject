import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubCommercialComponent } from './manage-sub-commercial.component';

describe('ManageSubCommercialComponent', () => {
  let component: ManageSubCommercialComponent;
  let fixture: ComponentFixture<ManageSubCommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSubCommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
