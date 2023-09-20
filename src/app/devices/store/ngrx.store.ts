import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
  Store,
} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable, Signal} from "@angular/core";
import {
  ActionTypes,
  Device, deviceLoadingReducer, devicesLoadedReducer,
  DeviceState,
  initialState, isLoadingProjector, isSortedProjector, selectAllProjector, selectCountProjector,
  selectDeviceReducer, selectedDeviceProjector, selectFullStateProjector, sortDevicesReducer,
  unselectDeviceReducer
} from "./domain";
import {exhaustMap, map} from "rxjs";
import {StoreFacade} from "./storeFacade";
import {faker} from "@faker-js/faker";
import {DeviceService} from "../service/device.service";

const deviceCreated = createAction(ActionTypes.DeviceCreated, props<{device: Device}>());
const deviceDeleted = createAction(ActionTypes.DeviceDeleted, props<{deviceId: string}>());
const loadDevices = createAction(ActionTypes.LoadDevices);
const devicesLoaded = createAction(ActionTypes.DevicesLoaded, props<{ devices: Device[] }>())
const deviceSelected = createAction(ActionTypes.DeviceSelected, props<{deviceId: string}>())
const deviceUnSelected = createAction(ActionTypes.DeviceUnselected);
const sortDevices = createAction(ActionTypes.DevicesSorted, props<{isSorted: boolean}>());

export const devicesReducer = createReducer(initialState,
    on(loadDevices, (state) => deviceLoadingReducer(state)),
    on(devicesLoaded, (state, action) => devicesLoadedReducer(state, action.devices)),
    on(deviceSelected, (state, action) => selectDeviceReducer(state, action.deviceId)),
    on(deviceUnSelected, (state) => unselectDeviceReducer(state)),
    on(sortDevices, (state, action) => sortDevicesReducer(state, action.isSorted)),
  );

// noinspection TypeScriptValidateTypes
@Injectable()
export class DevicesEffect {
  constructor(private actions$: Actions, private deviceService: DeviceService) {}

  loadDevices$ = createEffect(() =>
    this.actions$.pipe(ofType(loadDevices), exhaustMap(() =>
      this.deviceService.list().pipe(map((res: Device[]) => devicesLoaded({devices: res}))))));

  deviceCreated$ = createEffect(() =>
    this.actions$.pipe(ofType(deviceCreated), exhaustMap(({device}) =>
      this.deviceService.add(device).pipe(map(() => loadDevices())))));

  deviceDeleted$ = createEffect(() =>
    this.actions$.pipe(ofType(deviceDeleted), exhaustMap(({deviceId}) =>
      this.deviceService.delete(deviceId).pipe(map(() => loadDevices())))));
}

@Injectable({providedIn: "root"})
export class NgrxStore implements StoreFacade {
  nextId = () => crypto.randomUUID();
  private getDevicesState = createFeatureSelector<DeviceState>('devices');
  isSorted: Signal<boolean> = this.store.selectSignal(createSelector(this.getDevicesState, isSortedProjector))
  fullState$ = this.store.select(createSelector(this.getDevicesState, selectFullStateProjector))
  devices$ = this.store.select(createSelector(this.getDevicesState, selectAllProjector));
  count$ = this.store.select(createSelector(this.getDevicesState, selectCountProjector));
  selectedDevice$ = this.store.select(createSelector(this.getDevicesState, selectedDeviceProjector));
  isLoading$ = this.store.select(createSelector(this.getDevicesState, isLoadingProjector));

  create = () => this.store.dispatch(deviceCreated({device: {id: this.nextId(), name: faker.person.fullName()}}))
  selectDevice = (deviceId: string) => this.store.dispatch(deviceSelected({deviceId}))
  unSelectDevice = () => this.store.dispatch(deviceUnSelected())
  delete = (deviceId: string) => this.store.dispatch(deviceDeleted({deviceId}));
  sort = (isSorted: boolean) => this.store.dispatch(sortDevices({isSorted}));
  init = () => this.store.dispatch(loadDevices())

  constructor(private store: Store) {}
}

