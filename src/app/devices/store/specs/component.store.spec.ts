import {of, skip, take} from "rxjs";
import {DeviceState} from "../domain";
import {DeviceComponentStore} from "../component.store";
import {DeviceService} from "../../service/device.service";
import { marbles } from "rxjs-marbles/mocha";

describe('load() method', () => {
  const deviceList = [{id: '1', name: '1'}];
  const deviceService = jasmine.createSpyObj<DeviceService>('DeviceService', ['list']);

  it('load without marbles', (done: DoneFn) => {
    const store = new DeviceComponentStore(deviceService);
    deviceService.list.and.returnValue(of(deviceList))
    store.state$.pipe(skip(2), take(1)).subscribe({
      next: (state: DeviceState) => {
        expect(state.devices.all.length).toEqual(1);
        done();
      },
    });

    store.load();
  });

  it('load with marbles', marbles(m => {
    const store = new DeviceComponentStore(deviceService);
    deviceService.list.and.returnValue(m.cold('-a', { a: deviceList }));

    store.load();
    m.expect(store.devices$).toBeObservable(
      m.cold('ab', {
        a: [],
        b: deviceList,
      })
    );

    expect(deviceService.list).toHaveBeenCalled();
  }));
})
