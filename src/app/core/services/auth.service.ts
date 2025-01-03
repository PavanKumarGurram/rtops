import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.checkStoredToken();
  }

  private checkStoredToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.parseJwt(token);
      this.currentUserSubject.next(user);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => !!user)
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    // TODO: Implement actual API call
    return of({ token: 'dummy-token' });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}