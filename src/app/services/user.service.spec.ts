import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {of} from "rxjs";

describe('User Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let userService: UserService;
  let users = [{
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
    }]

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    userService = new UserService(httpClientSpy)

  })

  describe('getUsers', () => {
    it('should return expect users when getUsers is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(users))
      userService.getUsers().subscribe({
        next: (users) => {
          expect(users).toEqual(users)
          done();
        },
        error: () => {
          done.fail
        }
      })
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    })
  })


})
