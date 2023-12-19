import {UserModel} from "../../models/user.model";
import {UsersComponent} from "./users.component";
import {of} from "rxjs";

describe('User Component', () => {
  let users: UserModel[];
  let component: UsersComponent;
  let mockUserService: any;

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
    component = new UsersComponent(mockUserService)
  });
  describe('delete', () => {
    beforeEach(() => {
      mockUserService.deleteUser.and.returnValue(of(true));
      component.users = users;
    })
    it('should delete select user from the users', () => {
      component.deleteUser(users[1]);
      expect(component.users.length).toBe(2);
    })

    it('should the call the delete method in user service only once', () => {
      component.deleteUser(users[1]);
      expect(mockUserService.deleteUser).toHaveBeenCalledTimes(1);
    })

    it('should delete the actual selected user in users', () => {
      component.deleteUser(users[1]);
      for (let user of component.users) {
        expect(user).not.toEqual(users[1])
      }
    })
  })
})
