import { Injectable } from '@angular/core';
import {Device} from "../store/domain";
import {DeviceService} from "./device.service";
import {delay, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalDeviceService implements DeviceService{
  state = [
    {id: '123', name: 'Lorenzo McLaughlin'},
    {id: '321', name: 'Cassandra Kirlin'},
  ];
  list = () => of(this.state).pipe(delay(1000))
  add = (device: Device) => {
    this.state = [...this.state, device]
    return of({})
  }
  delete = (deviceId: string) => {
    this.state = this.state.filter(d => d.id !== deviceId)
    return of({})
  }
}
