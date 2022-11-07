import { TestBed } from '@angular/core/testing';

import { EightGameService } from './eight-game.service';

describe('EightGameService', () => {
  let service: EightGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EightGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
