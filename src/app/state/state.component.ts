import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StoreFacade} from "../devices/store/storeFacade";
import {AsyncPipe, JsonPipe} from "@angular/common";

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  template: `
<!--    <pre>{{ state$ | async | json }}</pre>-->
    <div class="img-overlay-wrap" width="100%" height="100%">
<!--       <pre class="foo">{{ state$ | async | json }}</pre>-->
       <img src="/assets/ngrx-device.gif" width="100%">
<!--      <img src="/assets/redux.png" width="1000">-->
<!--      <svg width="1000" height="1000">-->
<!--        <circle cx="75" cy="75" r="50" fill="transparent" stroke="red" stroke-width="1"/>-->
<!--      </svg>-->
    </div>
  `,
  standalone: true,
  styleUrls: ['./state.component.css'],
  imports: [AsyncPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateComponent {
  state$ = this.storeFacade.fullState$;
  constructor(private storeFacade: StoreFacade) {}
}
