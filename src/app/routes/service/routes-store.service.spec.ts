import {TestBed} from '@angular/core/testing';

import {RoutesStoreService} from './routes-store.service';

describe('RoutesStoreService', () => {
  let service: RoutesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
