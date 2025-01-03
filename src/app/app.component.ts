import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon>store</mat-icon>
            <span>Products</span>
          </a>
          <a mat-list-item routerLink="/cart" routerLinkActive="active">
            <mat-icon>shopping_cart</mat-icon>
            <span>Cart</span>
          </a>
          <a mat-list-item routerLink="/admin" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Admin Dashboard</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Real-Time Order Processing System</span>
        </mat-toolbar>

        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .main-content {
      padding: 20px;
    }
    .mat-list-item.active {
      background: rgba(0, 0, 0, 0.04);
    }
    mat-toolbar {
      display: flex;
      gap: 16px;
    }
  `]
})
export class AppComponent {}