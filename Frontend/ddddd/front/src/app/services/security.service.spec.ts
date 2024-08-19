import { TestBed, inject } from '@angular/core/testing';

import { SecurityService } from './security.service';
import { ConsumeService } from './consume.service';
import { ILoginReq } from '../model/http/security.model';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Endpoints } from 'src/environments/endpoints';
import { of, throwError } from 'rxjs';

declare var require: any;

describe('SecurityService', () => {
  let service: SecurityService;
  let consumeServiceSpy: jasmine.SpyObj<ConsumeService>;

  beforeEach(() => {
    consumeServiceSpy = jasmine.createSpyObj('ConsumeService', ['httpPost']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: ConsumeService, useValue: consumeServiceSpy }],
    });
    service = TestBed.inject(SecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const res: any = require('../../mocks/login.json');
    consumeServiceSpy.httpPost.and.returnValue(of(res));
    const data = {
      email: 'admin@example.com',
      password: '12345',
    } as ILoginReq;
    service.login(data).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.token).toBe('QpwL5tke4Pnpja7X4');
    });
  });

  it('should login with error', () => {
    consumeServiceSpy.httpPost.and.returnValue(throwError(() => 'err'));

    const data = {
      email: 'admin@example.com',
      password: '12345',
    } as ILoginReq;
    service.login(data).subscribe({
      error: (err) => {
        expect(err).toBeDefined();
      },
    });
  });
});
