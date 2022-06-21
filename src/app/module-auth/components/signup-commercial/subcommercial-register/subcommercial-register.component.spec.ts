import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcommercialRegisterComponent } from './subcommercial-register.component';

describe('SubcommercialRegisterComponent', () => {
  let component: SubcommercialRegisterComponent;
  let fixture: ComponentFixture<SubcommercialRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcommercialRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcommercialRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
