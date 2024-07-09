import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../services/http-wrapper.service';
import { map } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpWrapperService,
  ) { }

  getUsers() {
    return this.http.get('users').pipe(map((result: { data: any[] }) => {
      let users: User[] = result.data.map(item => new User(item));
      return {
        users: users,
      };
    }));
  }
}
