import { TestBed, async, inject } from '@angular/core/testing';

import { SuperAdminGuard } from './superAdmin.guard';

describe('SuperAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminGuard]
    });
  });

  it('should ...', inject([SuperAdminGuard], (guard: SuperAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
