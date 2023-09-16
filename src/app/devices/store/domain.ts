
export interface Device {
  id: string,
  name: string
}

export interface DeviceState {
  devices: {
    isLoading: boolean,
    isSorted: boolean,
    selectedDevice?: string,
    all: Device[],
  };
}

export const initialState: DeviceState = {
  devices: {
    isLoading: false,
    isSorted: false,
    selectedDevice: undefined,
    all: [],
  },
};

export enum ActionTypes {
  DeviceCreated = '[Device Page] Device Created',
  DeviceDeleted = '[Device Page] Device Deleted',
  LoadDevices = '[Device Page] Load Devices',
  DevicesLoaded = '[Device Page] Devices Loaded',
  DeviceSelected = '[Device Page] Device Selected',
  DeviceUnselected = '[Device Page] Device UnSelected',
  DevicesSorted = '[Device Page] Devices Sorted',
}

export const selectDeviceReducer = (state: DeviceState, deviceId: string) => ({
  ...state,
  devices: {
    ...state.devices,
    selectedDevice: deviceId,
  }
})

export const deleteDeviceReducer = (state: DeviceState, device: Device) => ({
  ...state,
  devices: {
    ...state.devices,
    all: [...state.devices.all.filter(d => d.name != device.name)],
  }
})

export const addDeviceReducer = (state: DeviceState, device: Device) => ({
  ...state,
  devices: {
    ...state.devices,
    all: [...state.devices.all, device],
    selectedDevice: device
  },
})

export const deviceLoadingReducer = (state: DeviceState) => ({
  ...state,
  devices: {
    ...state.devices,
    isLoading: true,
  }
})

export const devicesLoadedReducer = (state: DeviceState, devices: Device[]) => ({
  ...state,
  devices: {
    ...state.devices,
    all: devices,
    isLoading: false,
  }
})

export const unselectDeviceReducer = (state: DeviceState) => ({
  ...state,
  devices: {
    ...state.devices,
    selectedDevice: undefined
  },
})

export const sortDevicesReducer = (state: DeviceState, sort: boolean) => ({
  ...state,
  devices: {
    ...state.devices,
    isSorted: sort,
  },
})

export const selectFullStateProjector = (state: DeviceState) => state;
export const selectAllProjector = (state: DeviceState) => {
  if (state.devices.isSorted) {
    return [...state.devices.all].sort((a,b) => a.name < b.name ? -1 : 1)
  } else {
    return state.devices.all
  }
}
export const selectCountProjector = (state: DeviceState) => state.devices.all.length;
export const selectedDeviceProjector = (state: DeviceState) => state.devices.all
  .filter(d => d.id === state.devices.selectedDevice).pop();
export const isLoadingProjector = (state: DeviceState) => state.devices.isLoading;
export const isSortedProjector = (state: DeviceState) => state.devices.isSorted;

