import {Device} from "../store/domain";
import {Observable} from "rxjs";

export abstract class DeviceService {
  public abstract list(): Observable<Device[]>;
  public abstract add(device: Device): Observable<any>;
  public abstract delete(deviceId: string): Observable<any>;
}
