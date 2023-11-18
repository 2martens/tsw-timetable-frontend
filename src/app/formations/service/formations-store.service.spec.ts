import {TestBed} from '@angular/core/testing';

import {FormationsStoreService} from './formations-store.service';

describe('FormationsStoreService', () => {
  let service: FormationsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
