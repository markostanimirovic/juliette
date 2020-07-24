import { TestBed } from '@angular/core/testing';

import { JulietteService } from './juliette.service';

describe('JulietteService', () => {
  let service: JulietteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JulietteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
