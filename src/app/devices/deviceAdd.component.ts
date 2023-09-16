import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add',
  standalone: true,
  template: `
    <button (click)="add()">add</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceAddComponent {
  @Output() deviceAdded = new EventEmitter<Boolean>();

  add() {
    this.deviceAdded.emit(true)
  }
}
