import { TestBed } from '@angular/core/testing';

import { SharedCheckService } from './shared-check.service';

describe('SharedCheckService', () => {
  let service: SharedCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
