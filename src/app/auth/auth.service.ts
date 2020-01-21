import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { AuthRequest } from '../models/auth-request';

import { Observable, ReplaySubject, from } from 'rxjs';
import { delayWhen, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { environment } from 'src/environments/environment';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth$: Observable<AuthResponse>;
  private authSource: ReplaySubject<AuthResponse>;

  private saveAuth(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }

  constructor(private http: HttpClient, private storage: Storage) {
    this.authSource = new ReplaySubject(1);
    this.auth$ = this.authSource.asObservable();
  
    this.storage.get('auth').then(auth => {
      this.authSource.next(auth);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth$.pipe(map(auth => Boolean(auth)));
  }

  getUser(): Observable<User> {
    return this.auth$.pipe(map(auth => auth ? auth.user : undefined));
  }

  getToken(): Observable<string> {
    return this.auth$.pipe(map(auth => auth ? auth.token : undefined));
  }

  logIn(authRequest: AuthRequest): Observable<User> {

    const authUrl = `${environment.apiUrl}/users/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen(auth => {
        return this.saveAuth(auth);
      }),
      map(auth => {
        this.authSource.next(auth);
        return auth.user;
      })
    );
  }

  logOut() {
    this.authSource.next(null);
    this.storage.remove('auth');
    console.log('User logged out');
  }

}