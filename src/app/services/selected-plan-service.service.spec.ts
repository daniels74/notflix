import { TestBed } from '@angular/core/testing';

import { SelectedPlanServiceService } from './selected-plan-service.service';

describe('SelectedPlanServiceService', () => {
  let service: SelectedPlanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPlanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
