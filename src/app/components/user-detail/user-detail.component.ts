import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location, NgIf} from "@angular/common";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  user!: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }
  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.userService.getUser(+id).subscribe((user) => (this.user = user));
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.userService.updateUser(this.user).subscribe(() => this.goBack());
  }
}
