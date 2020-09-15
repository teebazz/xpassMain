import { TestBed } from '@angular/core/testing';

import { XpassService } from './xpass.service';

describe('XpassService', () => {
  let service: XpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
