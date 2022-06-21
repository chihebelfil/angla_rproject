import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFreightsComponent } from './manage-freights.component';

describe('ManageFreightsComponent', () => {
  let component: ManageFreightsComponent;
  let fixture: ComponentFixture<ManageFreightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFreightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFreightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
