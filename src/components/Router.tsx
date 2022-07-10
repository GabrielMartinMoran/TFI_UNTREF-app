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

export type RouterProps = {
    appContext: AppContext
};

export const Router: React.FC<RouterProps> = ({ appContext }) => {

    return (
        <NativeRouter>
            <Routes>
                <Route path='/' element={<HomeView appContext={appContext} />} />
                <Route path='/login' element={<LoginView appContext={appContext} />} />
                <Route path='/register' element={<RegisterView />} />
                <Route path='/logout' element={<LogoutView appContext={appContext} />} />
                <Route path='/devices' element={<MyDevicesView appContext={appContext} />} />
                <Route path='/devices/:deviceId' element={<DeviceView appContext={appContext} />} />
                <Route path='/devices/:deviceId/scheduler' element={<SchedulerView appContext={appContext} />} />
                <Route path='/devices/:deviceId/scheduler/task' element={<EditTaskView appContext={appContext} />} />


                <Route path='*' element={<HomeView appContext={appContext} />} />
            </Routes>
        </NativeRouter>
    );
};