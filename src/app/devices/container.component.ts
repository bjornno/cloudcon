import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {Device} from "./store/domain";
import {StoreFacade} from "./store/storeFacade";
import {DeviceAddComponent} from "./deviceAdd.component";
import {ListComponent} from "./list.component";
import {AsyncPipe} from "@angular/common";
import {CountComponent} from "./count.component";
import {SortComponent} from "./sort.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StateComponent} from "../state/state.component";

@Component({
  imports: [DeviceAddComponent, ListComponent, AsyncPipe, CountComponent, SortComponent],
  standalone: true,
  selector: 'app-container',
  template: `
    <div>
      <div class="row">
        <span class="col-sm-1"></span>
        <app-count [count]="count$ | async" class="col-sm-2"></app-count>
        <app-sort [isSorted]="isSorted()" (onSort)="sortDevices($event)" class="col-sm-7">></app-sort>
        <app-add (deviceAdded)="addDevice()" class="col-sm-1"></app-add>
        <button class="invisiblebutton col-sm-1" (click)="openNgrxFlow()"></button>
      </div>
      <div class="row">
        <span class="col-sm-1"></span>
        <app-list [devices]="devices$ | async"
                  [loading]="loading$ | async"
                  [selectedDevice]="selectedDevice$ | async"
                  (deviceSelected)="selectDevice($event)"
                  (deviceUnSelected)="deSelectDevice()"
                  (onDelete)="deleteDevice($event)"
                  class="col-sm-10"></app-list>
      </div>
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
  devices$ = this.storeFacade.devices$;
  selectedDevice$ = this.storeFacade.selectedDevice$;
  loading$ = this.storeFacade.isLoading$;
  count$ = this.storeFacade.count$;
  isSorted = () => this.storeFacade.isSorted();

  constructor(private storeFacade: StoreFacade,
              private modalService: NgbModal) {}

  selectDevice(device: Device) {
     this.storeFacade.selectDevice(device.id);
  }

  deSelectDevice() {
    this.storeFacade.unSelectDevice();
  }

  deleteDevice(deviceId: string) {
    this.storeFacade.delete(deviceId);
    this.deSelectDevice()
  }

  addDevice() {
    this.storeFacade.create();
  }

  sortDevices(isSorted: boolean) {
    this.storeFacade.sort(isSorted);
  }

  openNgrxFlow() {
    this.modalService.open(StateComponent, {size: "xl" });
  }
}
