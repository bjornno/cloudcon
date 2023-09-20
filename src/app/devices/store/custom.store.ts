import {BehaviorSubject, map, of} from "rxjs";
import {Injectable, signal} from "@angular/core";
import {
  Device, deviceLoadingReducer, devicesLoadedReducer,
  DeviceState,
  initialState, isLoadingProjector, isSortedProjector, selectAllProjector, selectCountProjector,
  selectDeviceReducer, selectedDeviceProjector, sortDevicesReducer,
  unselectDeviceReducer
} from "./domain";
import {StoreFacade} from "./storeFacade";
import {faker} from "@faker-js/faker";
import {DeviceService} from "../service/device.service";

@Injectable({providedIn: "root"})
export class CustomStore implements StoreFacade {
  private nextId = () => crypto.randomUUID();
  private readonly _state$ = new BehaviorSubject<DeviceState>(initialState);
  private state: DeviceState = initialState;

  readonly isSorted = signal(true)//this._state$.asObservable().pipe(map(isSortedProjector)));
  readonly fullState$ = this._state$.asObservable();
  readonly selectedDevice$ = this._state$.asObservable().pipe(map(selectedDeviceProjector));
  readonly devices$ = this._state$.asObservable().pipe(map(selectAllProjector));
  readonly count$ = this._state$.asObservable().pipe(map(selectCountProjector));
  readonly isLoading$ = this._state$.asObservable().pipe(map(isLoadingProjector));

  selectDevice = (deviceId: string) => this.update(selectDeviceReducer(this.state, deviceId))
  sort = (isSorted: boolean) => this.update(sortDevicesReducer(this.state, isSorted));
  unSelectDevice = () => this.update(unselectDeviceReducer(this.state))
  create = () => this.created({id: this.nextId(), name: faker.person.fullName()})

  load = () => {
    this.update(deviceLoadingReducer(this.state));
    // this would typically be an effect in ngrx
    this.deviceService.list().subscribe((devices: Device[]) =>
      this.update(devicesLoadedReducer(this.state, devices)));
  }

  created = (device: Device) => {
    this.update(deviceLoadingReducer(this.state));
    // this would typically be an effect in ngrx
    this.deviceService.add(device).subscribe(() => this.load());
  }

  delete = (deviceId: string) => {
    this.update(deviceLoadingReducer(this.state));
    // this would typically be an effect in ngrx
    this.deviceService.delete(deviceId).subscribe(() => this.load())
  }

  init = () => this.load();

  private update(state: DeviceState) {
    this.state = state;
    this._state$.next(state);
  }

  constructor(private deviceService: DeviceService) {}
}
