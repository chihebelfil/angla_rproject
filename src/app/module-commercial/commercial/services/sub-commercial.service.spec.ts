import { TestBed } from '@angular/core/testing';

import { SubCommercialService } from './sub-commercial.service';

describe('SubCommercialService', () => {
  let service: SubCommercialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCommercialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
