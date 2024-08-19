import { TestBed, inject } from '@angular/core/testing';

import { GuardService } from './guard.service';
import { DataService } from './data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

describe('GuardService', () => {
  let service: GuardService;
  let dataServiceSpy: any;
  let keycloakServiceSpy: any;

  beforeEach(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'userIsAuthenticated',
    ]);
    keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['login']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'login', redirectTo: '' }]),
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: KeycloakService, useValue: keycloakServiceSpy },
      ],
    });
    service = TestBed.inject(GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should access allowed true', (done) => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    // Se usa notación json para el objeto ya que es una propiedad protected
    service['authenticated'] = true;
    service.isAccessAllowed(route, state).then((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should access allowed false', (done) => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    // Se usa notación json para el objeto ya que es una propiedad protected
    service['authenticated'] = false;
    service.isAccessAllowed(route, state).then((res) => {
      expect(res).toBeFalsy();
      expect(keycloakServiceSpy.login).toHaveBeenCalled();
      done();
    });
  });
});
