import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { DevicesRepository } from '../../repositories/web-api/devices-repository';
import { MeasuresChart } from '../charts/MeasuresChart';
import { Button } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { DeviceListItem } from '../device/DeviceListItem';
import { MessageType } from '../../models/message-type';
import { AnimatedFAB } from 'react-native-paper';
import { FloatingActionButton } from '../ui/FloatingActionButton';
import { SectionTitle } from '../ui/SectionTitle';
import { Spacer } from '../ui/Spacer';

export type MyDevicesViewProps = {
    appContext: AppContext;
};

export const MyDevicesView: React.FC<MyDevicesViewProps> = ({ appContext }) => {
    const GET_DEVICES_REQUEST_INTERVAL = 2500;

    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;

    const [devices, setDevices] = useState([] as Array<Device>);

    const { navigateTo } = useAppNavigate(appContext);

    const getDevices = async () => {
        try {
            const _devices = await devicesRepository.getAll();
            setDevices(_devices);
        } catch (error) {
            console.log(error);
            appContext.showMessage(
                'Ha ocurrido un error al tratar de obtener la lista de dispositivos',
                MessageType.ERROR
            );
        }
    };

    useEffect(() => {
        appContext.deleteSharedState('device');
        getDevices();
        const interval = setInterval(() => getDevices(), GET_DEVICES_REQUEST_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const addDevice = () => {
        navigateTo({ route: ROUTES.searchDevices });
    };

    return (
        <View>
            <SectionTitle text="Mis dispositivos" />
            {devices.map((device: Device) => (
                <DeviceListItem key={device.deviceId} appContext={appContext} device={device} />
            ))}
            <SectionTitle text="Consumo de mis dispositivos" />
            <Spacer />
            <MeasuresChart appContext={appContext} />
            <Spacer margin="1.5rem" />
            <FloatingActionButton label="Agregar dispositivo" icon="plus" onPress={addDevice} />
        </View>
    );
};
