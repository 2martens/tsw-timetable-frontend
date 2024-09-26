import {TestBed} from '@angular/core/testing';

import {TimetableStoreService} from './timetable-store.service';

describe('TimetableStoreService', () => {
  let service: TimetableStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
