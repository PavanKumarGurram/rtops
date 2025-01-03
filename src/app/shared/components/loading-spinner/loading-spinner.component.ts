import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner-container">
      <mat-spinner diameter="50"></mat-spinner>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
  `]
})
export class LoadingSpinnerComponent {}