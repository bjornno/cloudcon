// noinspection TypeScriptValidateTypes

import { Injectable } from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {
  Device, deviceLoadingReducer, devicesLoadedReducer,
  DeviceState,
  initialState, isLoadingProjector, isSortedProjector, selectAllProjector, selectCountProjector,
  selectDeviceReducer, selectedDeviceProjector, selectFullStateProjector, sortDevicesReducer,
  unselectDeviceReducer
} from "./domain";
import {StoreFacade} from "./storeFacade";
import {exhaustMap, Observable, tap} from "rxjs";
import {faker} from "@faker-js/faker";
import {DeviceService} from "../service/device.service";

@Injectable({providedIn: "root"})
export class DeviceComponentStore extends ComponentStore<DeviceState> implements StoreFacade {
  nextId = () => crypto.randomUUID();

  readonly fullState$ = this.select(selectFullStateProjector);
  readonly devices$ = this.select(selectAllProjector);
  readonly count$ = this.select(selectCountProjector);
  readonly selectedDevice$ = this.select(selectedDeviceProjector);
  readonly isLoading$ = this.select(isLoadingProjector);
  readonly isSorted = this.selectSignal(isSortedProjector);

  setLoading = this.updater(deviceLoadingReducer)
  loadUpdater = this.updater(devicesLoadedReducer);
  selectDevice = this.updater(selectDeviceReducer);
  unSelectDevice = this.updater(unselectDeviceReducer);
  sort = this.updater(sortDevicesReducer)

  load = this.effect((v$) =>
    v$.pipe(tap(this.setLoading), exhaustMap(() =>
      this.deviceService.list().pipe(tap((devices: Device[]) =>
        this.loadUpdater(devices))))));

  delete = this.effect((deviceId$: Observable<string>) =>
    deviceId$.pipe(tap(this.setLoading), exhaustMap((deviceId: string) =>
      this.deviceService.delete(deviceId).pipe(tap(() => this.load())))));

  created = this.effect((device$: Observable<Device>) =>
    device$.pipe(tap(this.setLoading), exhaustMap((device: Device) =>
      this.deviceService.add(device).pipe(tap(() => this.load())))));

  create = () => {
    this.created({id: this.nextId(), name: faker.person.fullName()});
  }

  init = () => this.load()

  constructor(private deviceService: DeviceService) {
    super(initialState);
  }
}
