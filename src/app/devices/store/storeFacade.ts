import {Device, DeviceState} from "./domain";
import {Observable} from "rxjs";
import {Signal} from "@angular/core";

export abstract class StoreFacade {
  public abstract isSorted: Signal<boolean>;
  public abstract isLoading$: Observable<boolean>;
  public abstract fullState$:  Observable<DeviceState>;
  public abstract devices$:  Observable<Device[]>;
  public abstract selectedDevice$:  Observable<Device|undefined>;
  public abstract count$: Observable<number>;
  public abstract create(): void;
  public abstract delete(deviceId: string): any;
  public abstract selectDevice(deviceId: string): void;
  public abstract unSelectDevice(): void;
  public abstract sort(isSorted: boolean): void;
  public abstract init(): void;
}
