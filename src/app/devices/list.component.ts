import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Device} from "./store/domain";
import {NgFor, NgIf} from "@angular/common";
import {DeviceAddComponent} from "./deviceAdd.component";
import {CountComponent} from "./count.component";
import {SortComponent} from "./sort.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="card-body">
      <div class="spinner" *ngIf="loading" style="display: flex; justify-content: center; align-items: center; background: white;">
        <div class="spinner-border float-center" role="status">
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
        <tr>
          <th scope="col">Device</th>
        </tr>
        </thead>
        <tbody>
            <tr *ngFor="let device of devices; index as i"
                (mouseenter)="selectDevice(device)"
                (mouseleave)="unselectDevice()"
                [class.highlighted]="device.id === selectedDevice?.id">
              <td>
                <span>{{device.name}}</span>
              </td>
              <td>
                <button class="btn btn-light" (click)="delete(device.id)">Delete</button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() devices?: Device[] | null;
  @Input() loading?: boolean | null;
  @Input() selectedDevice: Device | null | undefined;
  @Output() deviceSelected = new EventEmitter<Device>();
  @Output() deviceUnSelected = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<string>();

  selectDevice(device: Device) {
    this.deviceSelected.emit(device)
  }

  delete(deviceId: string) {
    this.onDelete.emit(deviceId);
  }

  unselectDevice() {
    this.deviceUnSelected.emit(true)
  }
}
