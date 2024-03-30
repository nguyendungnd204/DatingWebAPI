import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../_models/_user';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  setCurrentUser(user: User | null) {
    throw new Error('Method not implemented.');
  }
  baseUrl = 'http://localhost:5231/api/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private  http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user); // Emit user to currentUserSource
        }
      })
    );
  }

  register(model : any)
  {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrenUser(user:User)
  {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    // Clear currentUserSource
  }
  
}
