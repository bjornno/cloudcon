import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EffectsModule} from "@ngrx/effects";
import {DevicesEffect, devicesFeature, NgrxStore,} from "./devices/store/ngrx.store";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreFacade} from "./devices/store/storeFacade";
import {HttpClientModule} from "@angular/common/http";
import {DeviceService} from "./devices/service/device.service";
import {LocalDeviceService} from "./devices/service/localDevice.service";
import {RouterModule, Routes} from "@angular/router";

export interface AppState {

}

export const routerReducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const routerStateConfig = {
  stateKey: 'router', // state-slice name for routing state
};

const routes: Routes = [
  { path: 'devices', loadComponent: () => import('./devices/container.component').then(mod => mod.ContainerComponent)},
  { path: 'state', loadComponent: () => import('./state/state.component').then(mod => mod.StateComponent)},
  { path: '**', loadComponent: () => import('./devices/container.component').then(mod => mod.ContainerComponent)}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    EffectsModule.forRoot([DevicesEffect]),
    StoreModule.forRoot(
      { devices: devicesFeature.reducer },
    ),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
    StoreDevtoolsModule.instrument(),
    [RouterModule.forRoot(routes)]
  ],
  providers: [
    {provide: StoreFacade, useExisting: NgrxStore}, // CustomStore, DeviceComponentStore, NgrxStore
    {provide: DeviceService, useExisting: LocalDeviceService}, // LocalDeviceService, RemoteDeviceService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
  constructor(storeFacade: StoreFacade) {
    storeFacade.init()
  }
}
