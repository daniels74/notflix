import { TestBed } from '@angular/core/testing';

import { MovieListGuard } from './movie-list.guard';

describe('MovieListGuard', () => {
  let guard: MovieListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MovieListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
