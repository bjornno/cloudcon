import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Device} from "../store/domain";
import {DeviceService} from "./device.service";

@Injectable({
  providedIn: 'root'
})
export class RemoteDeviceService implements DeviceService{

  constructor(private http: HttpClient) { }

  list = () => this.http.get<Device[]>("/api/")
  add = (device: Device) => this.http.put(`/api/${device.id}`, device)
  delete = (deviceId: string) => this.http.delete(`/api/${deviceId}`)
}
