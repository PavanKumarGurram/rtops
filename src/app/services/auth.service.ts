import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {
    // Check localStorage for existing token
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserSubject.next(this.parseJwt(token));
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    // TODO: Implement actual API call
    return new Observable();
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