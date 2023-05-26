import { TestBed } from '@angular/core/testing';

import { MovieTrailersResolver } from './movie-trailers.resolver';

describe('MovieTrailersResolver', () => {
  let resolver: MovieTrailersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovieTrailersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
