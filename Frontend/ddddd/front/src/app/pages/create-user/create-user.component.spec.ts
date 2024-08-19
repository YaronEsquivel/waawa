import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BasicUser } from 'src/app/model/http/users.model';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';
import { MockUsersFormComponent } from 'src/mocks/components.mocks';
import { throwError } from 'rxjs';
import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UsersService>('UsersService', ['createUser']);
    dataServiceSpy = jasmine.createSpyObj<DataService>('DataService', ['setGeneralNotificationMessage']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    userServiceSpy.createUser.and.callFake(() => {
      return of({
        id: 1,
        name: 'Joe',
        age: 25,
        phone: '1111111111'
      })
    });
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent, MockUsersFormComponent],
      providers: [
        { provide: UsersService, useValue: userServiceSpy },
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should createUser', () => {
    const user = new BasicUser();
    user.name = 'Joe';
    user.age = 25;
    user.phone = '1111111111';
    component.createUser(user);
    expect(userServiceSpy.createUser).toHaveBeenCalledWith(user);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users']);
  });
  it('should createUser', () => {
    const user = new BasicUser();
    user.name = 'Joe';
    user.age = 25;
    user.phone = '1111111111';
    component.createUser(user);
    expect(userServiceSpy.createUser).toHaveBeenCalledWith(user);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users']);
  });
  it('should createUser with error', () => {
    userServiceSpy.createUser.and.callFake(() => {
      return throwError('error');
    });
    const user = new BasicUser();
    user.name = 'Joe';
    user.age = 25;
    user.phone = '1111111111';
    component.createUser(user);
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalled();
  });
});
