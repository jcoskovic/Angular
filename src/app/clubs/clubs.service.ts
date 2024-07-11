import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../services/http-wrapper.service';
import { Observable, map } from 'rxjs';
import { Club } from '../models/club';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  constructor(
    public http:HttpWrapperService,
  ) { }

  getClubs(){
    return this.http.get('clubs').pipe(map((result: { data: any[]}) => {
      let clubs: Club[] = result.data.map(item => new Club(item));
      return {
        clubs: clubs,
      };
    }));
  }

 deleteClub(id: number): Observable<any> {
  return this.http.delete(`clubs/${id}`);
}

storeClub(club: Club): Observable<any> {
  let data = {
    name: club.name,
    supervisor_id: club.supervisor?.id,
  }
  return this.http.post('clubs', data);
}

getSupervisors() {
  return this.http.get('supervisors').pipe(
    map((result: { data: any[] }) => {
      let supervisors: User[] = result.data.map(item => new User(item));
      return {
        supervisors: supervisors,
      };
    })
  );
}

}

