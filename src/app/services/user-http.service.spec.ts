import {TestBed} from "@angular/core/testing";
import {UserService} from "./user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../models/user.model";

describe('user service (HttpClient Testing Module)', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

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
    }]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    })

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  describe('getUsers()', () => {
    it('should return users when call getUsers() is called', (done: DoneFn) => {
      userService.getUsers().subscribe(data => {
        expect(data).toEqual(Users)
        done()
      })

      const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users')
      request.flush(Users)
      expect(request.request.method).toBe('GET')
    })
  })


  describe('getUser()', () => {
    it('should return single user when getUser is called with userId', () => {
      userService.getUser(1).subscribe()
      const request = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/users/1`)
      expect(request.request.method).toBe('GET')
    })
    afterEach(() => {
      httpTestingController.verify()
    })
  })
})
