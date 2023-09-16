import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
    <div class="app">
      <div class="alert alert-primary" role="alert">
        https://github.com/bjornno/cloudcon
      </div>
<!--      <div class="nav nav-tabs d-flex" id="nav-tab" role="tablist">-->
<!--        <a-->
<!--          class="w-100 nav-item nav-link"-->
<!--          routerLink="/devices"-->
<!--          routerLinkActive="active"-->
<!--          style="flex: 1"-->
<!--        >-->
<!--          Devices-->
<!--        </a>-->
<!--        <a-->
<!--          class="w-100 nav-item nav-link"-->
<!--          routerLink="/state"-->
<!--          routerLinkActive="active"-->
<!--          style="flex: 1"-->
<!--        >-->
<!--          State-->
<!--        </a>-->
<!--      </div>-->
      <router-outlet></router-outlet>
    </div>

  `,

})
export class AppComponent {
  title = 'state management';
}
