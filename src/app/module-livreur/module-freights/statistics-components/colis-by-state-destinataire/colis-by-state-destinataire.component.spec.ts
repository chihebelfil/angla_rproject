import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisByStateDestinataireComponent } from './colis-by-state-destinataire.component';

describe('ColisByStateDestinataireComponent', () => {
  let component: ColisByStateDestinataireComponent;
  let fixture: ComponentFixture<ColisByStateDestinataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColisByStateDestinataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColisByStateDestinataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
