import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { AppContext } from '../app-context';
import { HomeView } from './views/HomeView';
import { LoginView } from './views/LoginView';
import { LogoutView } from './views/LogoutView';
import { MyDevicesView } from './views/MyDevicesView';
import { DeviceView } from './views/DeviceView';
import { SchedulerView } from './views/SchedulerView';
import { RegisterView } from './views/RegisterView ';
import { EditTaskView } from './views/EditTaskView';
import { SearchDeviceView } from './views/configure-device/SearchDeviceView';
import { SearchDeviceNetworkView } from './views/configure-device/SearchDeviceNetworkView';
import { ConfigureDeviceViewceView } from './views/configure-device/ConfigureDeviceView';
import { ConfigureDeviceNetworkView } from './views/configure-device/ConfigureDeviceNetworkView';
import { View } from 'react-native';
import { AppBar } from './ui/AppBar';
import { Drawer } from './ui/Drawer';
import { ROUTES } from '../routes';
import { Snackbar } from './ui/Snackbar';

export type RouterProps = {
    appContext: AppContext;
};

export const Router: React.FC<RouterProps> = ({ appContext }) => {
    return (
        <NativeRouter>
            <Drawer appContext={appContext} />
            <AppBar appContext={appContext} />
            <View
                style={{
                    flex: 1,
                    marginTop: '0.5rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginBottom: '1rem',
                }}
            >
                <Snackbar appContext={appContext} />
                <Routes>
                    {
                        /*
                    <Route path="/" element={<HomeView appContext={appContext} />} />
                    <Route path="/login" element={<LoginView appContext={appContext} />} />
                    <Route path="/register" element={<RegisterView />} />
                    <Route path="/logout" element={<LogoutView appContext={appContext} />} />
                    <Route path="/devices" element={<MyDevicesView appContext={appContext} />} />

                    <Route path="/devices/search" element={<SearchDeviceView appContext={appContext} />} />
                    <Route path="/devices/configure" element={<ConfigureDeviceViewceView appContext={appContext} />} />
                    <Route path="/devices/networks" element={<SearchDeviceNetworkView appContext={appContext} />} />
                    <Route path="/devices/network" element={<ConfigureDeviceNetworkView appContext={appContext} />} />

                    <Route path="/devices/:deviceId" element={<DeviceView appContext={appContext} />} />
                    <Route path="/devices/:deviceId/scheduler" element={<SchedulerView appContext={appContext} />} />
                    <Route
                        path="/devices/:deviceId/scheduler/task"
                        element={<EditTaskView appContext={appContext} />}
                    />

                    <Route path="*" element={<HomeView appContext={appContext} />} />
                    */
                        Object.values(ROUTES).map((route) => (
                            <Route
                                path={route.path}
                                element={<route.component appContext={appContext} />}
                                key={route.path}
                            />
                        ))
                    }
                </Routes>
            </View>
        </NativeRouter>
    );
};
