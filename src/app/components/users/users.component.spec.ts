import {UsersComponent} from "./users.component";
import {of} from "rxjs";
import {User} from "../../models/user.model";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {UserService} from "../../services/user.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {UserComponent} from "../user/user.component";

describe('Users Component', () => {
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

  it('should create on user child element for each user', () => {
    mockUserService.getUsers.and.returnValue(of(users))
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const usersElement = debugElement.queryAll(By.css('.users'))
    expect(usersElement.length).toBe(users.length)
  })

  it('should create exact same number of user component with users', () => {
    mockUserService.getUsers.and.returnValue(of(users))
    fixture.detectChanges();
    const userComponentDEs = fixture.debugElement.queryAll(By.directive(UserComponent))
    expect(userComponentDEs.length).toEqual(users.length)
  })

  it('should check whether exact user is sending to userComponent', () => {
    mockUserService.getUsers.and.returnValue(of(users))
    fixture.detectChanges();
    const userComponentDEs = fixture.debugElement.queryAll(By.directive(UserComponent))
    for (let i = 0; i < userComponentDEs.length; i++) {
      let userComponentInstance = userComponentDEs[i].componentInstance as UserComponent;
      expect(userComponentInstance.user.name).toEqual(users[i].name)
    }
  })

  it('should find <p> with fixture.debugElement.nativeElement', () => {
    const itemDe: DebugElement = fixture.debugElement;
    const itemEl: HTMLElement = itemDe.nativeElement;
    const p = itemEl.querySelector('p');
    expect(p?.textContent).toEqual('User List');
  })

  it('should find <p> with fixture.debugElement.query(By.css)', () => {
    const itemDe: DebugElement = fixture.debugElement;
    const itemEl = itemDe.query(By.css('p'));
    const p: HTMLElement = itemEl.nativeElement;
    expect(p?.textContent).toEqual('User List');
  })

  it('should set users from the service directly', () => {
    mockUserService.getUsers.and.returnValue(of(users))
    fixture.detectChanges();
    expect(comp.users.length).toBe(3)
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

    it('should call delete method when user component button is clicked!', () => {
      spyOn(comp, 'deleteUser')
      mockUserService.getUsers.and.returnValue(of(users))

      fixture.detectChanges();
      let userElementDEs = fixture.debugElement.queryAll(By.directive(UserComponent))
      for (let i = 0; i < userElementDEs.length; i++) {
        userElementDEs[i].query(By.css('button')).triggerEventHandler('click', {
          preventDefault: () => {
          }
        })
        expect(comp.deleteUser).toHaveBeenCalledWith(users[i])
      }

    })


    it('should call the delete method when the delete event is emitted in User Component', () => {
      spyOn(comp, 'deleteUser');
      mockUserService.getUsers.and.returnValue(of(users));
      fixture.detectChanges();

      let userComponentDEs = fixture.debugElement.queryAll(
        By.directive(UserComponent)
      );

      for (let i = 0; i < userComponentDEs.length; i++) {
        (userComponentDEs[i].componentInstance as UserComponent).delete.emit(
          users[i]
        );
        expect(comp.deleteUser).toHaveBeenCalledWith(users[i]);
      }
    });
  })
})
