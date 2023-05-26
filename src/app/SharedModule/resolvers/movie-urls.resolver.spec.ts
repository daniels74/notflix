import { TestBed } from '@angular/core/testing';

import { MovieUrlsResolver } from './movie-urls.resolver';

describe('MovieUrlsResolver', () => {
  let resolver: MovieUrlsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovieUrlsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
