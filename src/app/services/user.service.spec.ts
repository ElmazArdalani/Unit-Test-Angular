import {UserService} from "./user.service";
import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {User} from "../models/user.model";

describe('User Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let userService: UserService;
  let Users: User[] = [{
    id: 1,
    name: 'elnaz',
    username: 'e.test',
    email: 'elnaz@gmail.com',
    phone: '123456'
  },
    {
      id: 2,
      name: 'ali',
      username: 'a.test',
      email: 'ali@gmail.com',
      phone: '123456'
    },
    {
      id: 3,
      name: 'sara',
      username: 's.test',
      email: 'sara@gmail.com',
      phone: '123456'
    }];
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    userService = TestBed.inject(UserService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  describe('getUsers()', () => {
    it('should return expected users when getUsers is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(Users));
      userService.getUsers().subscribe({
        next: (users) => {
          expect(users).toEqual(Users);
          done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
