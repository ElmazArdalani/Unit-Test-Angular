import {UserComponent} from "./user.component";
import {User} from "../../models/user.model";
import {first} from "rxjs";

describe('UserComponent', () => {
  let component: UserComponent;
  beforeEach(() => {
    component = new UserComponent();
  })
  it('should raise an event when the delete user is clicked', () => {
    const user: User = {
      id: 1,
      name: 'elnaz',
      username: 'e.test',
      email: 'elnaz@gmail.com',
      phone: '123456'
    };
    component.user = user;
    component.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(user);
    });
    component.onDeleteUser(new MouseEvent('click'));
  })

});
