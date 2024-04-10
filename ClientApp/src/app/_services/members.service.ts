import { Injectable } from '@angular/core';
import { config } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = config.apiUrl;
  httpOptions: any;
  base = 'http://localhost:5231/api/'

  constructor(private http: HttpClient) {
    
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.base + 'users')
     
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(this.base + 'users/' + username);
  }
}
