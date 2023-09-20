
export interface Device {
  id: string,
  name: string
}

export interface DeviceState {
    isLoading: boolean,
    isSorted: boolean,
    selectedDevice?: string,
    all: Device[],
}

export const initialState: DeviceState = {
    isLoading: false,
    isSorted: false,
    selectedDevice: undefined,
    all: [],
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
  ...state, selectedDevice: deviceId
})

export const deviceLoadingReducer = (state: DeviceState) => ({
  ...state, isLoading: true,
})

export const devicesLoadedReducer = (state: DeviceState, devices: Device[]) => ({
  ...state, all: devices, isLoading: false
})

export const unselectDeviceReducer = (state: DeviceState) => ({
  ...state, selectedDevice: undefined
})

export const sortDevicesReducer = (state: DeviceState, sort: boolean) => ({
  ...state, isSorted: sort
})

export const selectFullStateProjector = (state: DeviceState) => state;
export const selectCountProjector = (state: DeviceState) => state.all.length;
export const selectedDeviceProjector = (state: DeviceState) => state.all
  .filter(d => d.id === state.selectedDevice).pop();
export const isLoadingProjector = (state: DeviceState) => state.isLoading;
export const isSortedProjector = (state: DeviceState) => state.isSorted;
export const selectAllProjector = (state: DeviceState) => state.isSorted
  ? [...state.all].sort((a,b) => a.name < b.name ? -1 : 1)
  : state.all

