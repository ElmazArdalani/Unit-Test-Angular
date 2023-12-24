import {UserComponent} from "./user.component";
import {User} from "../../models/user.model";
import {first} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;
  let comp: UserComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
    })
    fixture = TestBed.createComponent(UserComponent)
    comp = fixture.componentInstance;
  })

  it('should create user component using TestBed', () => {
    expect(comp).toBeDefined();
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
