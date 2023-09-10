import { DeviceView } from './components/views/DeviceView';
import { EditTaskView } from './components/views/EditTaskView';
import { HomeView } from './components/views/HomeView';
import { LoginView } from './components/views/LoginView';
import { LogoutView } from './components/views/LogoutView';
import { MyDevicesView } from './components/views/MyDevicesView';
import { RegisterView } from './components/views/RegisterView ';
import { SchedulerView } from './components/views/SchedulerView';
import { ConfigureDeviceNetworkView } from './components/views/configure-device/ConfigureDeviceNetworkView';
import { ConfigureDeviceViewceView } from './components/views/configure-device/ConfigureDeviceView';
import { SearchDeviceNetworkView } from './components/views/configure-device/SearchDeviceNetworkView';
import { SearchDeviceView } from './components/views/configure-device/SearchDeviceView';
import { CONFIG } from './config';
import { Route } from './models/route';

export const ROUTES = {
    home: new Route({
        path: '/',
        component: HomeView,
        title: CONFIG.DEFAULT_LOCATION_NAME,
    }),
    login: new Route({
        path: '/login',
        component: LoginView,
        title: 'Iniciar sesión',
    }),
    register: new Route({
        path: '/register',
        component: RegisterView,
        title: 'Registrarse',
    }),
    logout: new Route({
        path: '/logout',
        component: LogoutView,
        title: 'Cerrar sesión',
    }),
    myDevices: new Route({
        path: '/devices',
        component: MyDevicesView,
        title: 'Mis dispositivos',
    }),
    searchDevices: new Route({
        path: '/devices/search',
        component: SearchDeviceView,
        title: 'Buscar dispositivo',
    }),
    configureDevice: new Route({
        path: '/devices/configure',
        component: ConfigureDeviceViewceView,
        title: 'Configurar dispositivo',
    }),
    searchDeviceNetworks: new Route({
        path: '/devices/networks',
        component: SearchDeviceNetworkView,
        title: 'Buscar redes',
    }),
    configureDeviceNetwork: new Route({
        path: '/devices/network',
        component: ConfigureDeviceNetworkView,
        title: 'Configurar red',
    }),
    device: new Route({
        path: '/devices/:deviceId',
        component: DeviceView,
        title: undefined,
    }),
    deviceScheduler: new Route({
        path: '/devices/:deviceId/scheduler',
        component: SchedulerView,
        title: 'Programar',
    }),
    editTask: new Route({
        path: '/devices/:deviceId/scheduler/task',
        component: EditTaskView,
        title: 'Editar tarea',
    }),
    wildcard: new Route({
        path: '*',
        component: HomeView,
        title: CONFIG.DEFAULT_LOCATION_NAME,
    }),
};
