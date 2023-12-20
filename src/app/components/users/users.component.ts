import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {NgForOf} from "@angular/common";
import {UserComponent} from "../user/user.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf,
    UserComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  deleteUser(user: User) {
    this.users = this.users.filter(item => item.id !== user.id);
    this.userService.deleteUser(user).subscribe();
  }
}
