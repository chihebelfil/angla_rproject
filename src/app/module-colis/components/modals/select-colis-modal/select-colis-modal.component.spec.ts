import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColisModalComponent } from './select-colis-modal.component';

describe('SelectColisModalComponent', () => {
  let component: SelectColisModalComponent;
  let fixture: ComponentFixture<SelectColisModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectColisModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
