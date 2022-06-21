import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerColisComponent } from './lister-colis.component';

describe('ListerColisComponent', () => {
  let component: ListerColisComponent;
  let fixture: ComponentFixture<ListerColisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerColisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
