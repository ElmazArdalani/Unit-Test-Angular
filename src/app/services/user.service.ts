import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<UserModel[]>(`https://jsonplaceholder.typicode.com/users`)
  }

  deleteUser(user: UserModel) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
  }
}
