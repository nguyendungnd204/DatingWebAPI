import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { config } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser: any
  setCurrentUser(user: any) {
    this.currentUser = user;
  }
  baseUrl = config.apiUrl
  private currentUserSource = new ReplaySubject<User | null>();
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
