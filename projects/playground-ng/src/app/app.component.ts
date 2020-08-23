import { Component } from '@angular/core';

@Component({
  selector: 'pg-root',
  template: `
    <div class="header">
      <a class="buffer-right" routerLink="/users">Users</a>
      <a class="buffer-right" routerLink="/feature1">Feature 1</a>
      <a class="buffer-right" routerLink="/feature2">Feature 2</a>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
