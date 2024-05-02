import { Injectable } from '@angular/core';
import { config } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  loadMembers(): Observable<Member[]> {
    throw new Error('Method not implemented.');
  }

  baseUrl = config.apiUrl;
  httpOptions: any;
  base = 'http://localhost:5231/api/'
  members: Member[] = []

  constructor(private http: HttpClient) {
    
  }

  getMembers(): Observable<Member[]> {
    if(this.members.length>0) return of(this.members)
    return this.http.get<Member[]>(this.base + 'users').pipe(
  map(members=>{
    this.members=members
    return members
  })
  )
     
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(x=>x.username === username)
    if( member !== undefined) return of(member)
    return this.http.get<Member>(this.base + 'users/' + username);
  }
  updateMember(member:Member){
    return this.http.put(this.base +'users', member).pipe(
      map(()=>{
        const index = this.members.indexOf(member)
        this.members[index] = member
      })
    )
  }

  setMainPhoto(PhotoId:number){
    return this.http.put(this.baseUrl+'users/set-main-photo/'+ PhotoId,{})
  }
  deletePhoto(PhotoId:number){
    return this.http.delete(this.baseUrl+'users/delete-photo/'+ PhotoId)
  }
}
