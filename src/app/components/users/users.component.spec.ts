import {UsersComponent} from "./users.component";
import {of} from "rxjs";
import {User} from "../../models/user.model";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {UserService} from "../../services/user.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('User Component', () => {
  let users: User[];
  let mockUserService: any;
  let fixture: ComponentFixture<UsersComponent>;
  let comp: UsersComponent;


  beforeEach(() => {
    users = [{
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
    mockUserService = jasmine.createSpyObj(['getUsers', 'deleteUser'])

    TestBed.configureTestingModule({
      providers: [UsersComponent, {
        provide: UserService, useValue: mockUserService
      }]
    })
    fixture = TestBed.createComponent(UsersComponent)
    comp = fixture.componentInstance;
  });


  it('should find <p> with fixture.debugElement.nativeElement', () => {
    const itemDe: DebugElement = fixture.debugElement;
    const itemEl: HTMLElement = itemDe.nativeElement;
    const p = itemEl.querySelector('p');
    expect(p?.textContent).toEqual('User List');
  })

  it('should find <p> with fixture.debugElement.query(By.css)', () => {
    const itemDe: DebugElement = fixture.debugElement;
    const itemEl = itemDe.query(By.css('p'));
    const p:HTMLElement = itemEl.nativeElement;
    expect(p?.textContent).toEqual('User List');
  })

  describe('delete', () => {
    beforeEach(() => {
      mockUserService.deleteUser.and.returnValue(of(true));
      comp.users = users;
    })
    it('should delete select user from the users', () => {
      comp.deleteUser(users[1]);
      expect(comp.users.length).toBe(2);
    })

    it('should the call the delete method in user service only once', () => {
      comp.deleteUser(users[1]);
      expect(mockUserService.deleteUser).toHaveBeenCalledTimes(1);
    })

    it('should delete the actual selected user in users', () => {
      comp.deleteUser(users[1]);
      for (let user of comp.users) {
        expect(user).not.toEqual(users[1])
      }
    })
  })
})
