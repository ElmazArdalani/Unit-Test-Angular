import {UserComponent} from "./user.component";
import {User} from "../../models/user.model";
import {first} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;
  let comp: UserComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({})
    fixture = TestBed.createComponent(UserComponent)
    comp = fixture.componentInstance;
  })

  it('should create user component using TestBed', () => {
    expect(comp).toBeDefined();
  })

  it('should render the user name in the anchor element', () => {
    const user: User = {
      id: 1,
      name: 'elnaz',
      username: 'e.test',
      email: 'elnaz@gmail.com',
      phone: '123456'
    };
    comp.user = user;
    fixture.detectChanges()
    const userElement: HTMLElement = fixture.nativeElement;
    const a = userElement.querySelector('a');
    expect(a?.textContent).toContain(user.name)
  })

  it('should render the user name in the anchor element using debug element', () => {
    const user: User = {
      id: 1,
      name: 'elnaz',
      username: 'e.test',
      email: 'elnaz@gmail.com',
      phone: '123456'
    };
    comp.user = user;
    fixture.detectChanges()
    const userDebugElement = fixture.debugElement;
    const aElement: HTMLElement = userDebugElement.query(By.css('a')).nativeElement;
    expect(aElement?.textContent).toContain(user.name)
  })

  it('should raise an event when the delete user is clicked', () => {
    const user: User = {
      id: 1,
      name: 'elnaz',
      username: 'e.test',
      email: 'elnaz@gmail.com',
      phone: '123456'
    };
    comp.user = user;
    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(user);
    });
    comp.onDeleteUser(new MouseEvent('click'));
  })

});
