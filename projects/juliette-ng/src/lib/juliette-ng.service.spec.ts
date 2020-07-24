import { TestBed } from '@angular/core/testing';

import { JulietteNgService } from './juliette-ng.service';

describe('JulietteNgService', () => {
  let service: JulietteNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JulietteNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
