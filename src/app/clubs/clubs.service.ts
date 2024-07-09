import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../services/http-wrapper.service';
import { Observable, map } from 'rxjs';
import { Club } from '../models/club';

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

}

