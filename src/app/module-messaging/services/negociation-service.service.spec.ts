import { TestBed } from '@angular/core/testing';

import { NegociationServiceService } from './negociation-service.service';

describe('NegociationServiceService', () => {
  let service: NegociationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegociationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
