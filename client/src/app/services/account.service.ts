import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserBehaviourSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserBehaviourSubject.asObservable();

  constructor(private http: HttpClient) {}

  onLogin(model: any) {
    return this.http.post<User>(this.baseUrl + '/account/login', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserBehaviourSubject.next(user);
        }
      })
    );
  }

  onRegister(model: any) {
    return this.http.post<User>(this.baseUrl + '/account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserBehaviourSubject.next(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserBehaviourSubject.next(user);
  }

  onLogout() {
    localStorage.removeItem('user');
    this.currentUserBehaviourSubject.next(null);
  }
}
