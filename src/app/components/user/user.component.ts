import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/user.model";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user!: User;

  @Output() delete = new EventEmitter<User | null>();


  onDeleteUser(event: Event) {
    event.preventDefault();
    this.delete.emit(this.user);
  }

}
