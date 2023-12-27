import {Location} from '@angular/common';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {UserDetailComponent} from "./user-detail.component";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {User} from "../../models/user.model";


describe('UserDetailComponent', () => {
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    mockUserService = jasmine.createSpyObj(['getUser', 'updateUser']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      providers: [
        {provide: Location, useValue: mockLocation},
        {provide: UserService, useValue: mockUserService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
    });

    fixture = TestBed.createComponent(UserDetailComponent);

  });

  it('should render the user name in h2 template', () => {
    mockUserService.getUser.and.returnValue(of({
      id: 3,
      name: 'elnaz',
      email: 'elnaz@gmail.com'
    } as User))
    fixture.detectChanges()
    // const element=fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
    const element = fixture.nativeElement.querySelector('h2') as HTMLElement
    expect(element?.textContent).toBe(fixture.componentInstance.user.name)
  })

});
