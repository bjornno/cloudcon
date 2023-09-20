// noinspection AngularUndefinedBinding

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {StoreFacade} from "../devices/store/storeFacade";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  template: `
    <div *ngIf="page === 1" (click)="updateState()">
      <pre>{{ state$ | async | json }}</pre>
    </div>
    <img src="/assets/ngrx-new3.gif" width="100%" *ngIf="page === 2">
    <div *ngIf="page === 3">
      <img src="/assets/tagscomponent.png" width="100%">
      <img src="/assets/devicetagcomponent.gif" width="100%" >
    </div>
  `,
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateComponent {
  @Input() page: number = 0;
  state$ = this.storeFacade.fullState$;
  constructor(private storeFacade: StoreFacade) {}

  updateState() {
    this.storeFacade.create();
    this.storeFacade.sort(!this.storeFacade.isSorted());
  }
}
