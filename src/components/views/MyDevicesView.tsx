import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { DevicesRepository } from '../../repositories/web-api/devices-repository';
import { MeasuresChart } from '../charts/MeasuresChart';
import { Button } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';

export type MyDevicesViewProps = {
    appContext: AppContext;
};

export const MyDevicesView: React.FC<MyDevicesViewProps> = ({ appContext }) => {
    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;

    const [devices, setDevices] = useState([] as Array<Device>);

    const { navigateTo } = useAppNavigate(appContext);

    useEffect(() => {
        const getDevices = async () => {
            try {
                setDevices(await devicesRepository.getAll());
            } catch (error) {
                console.log(error);
            }
        };

        appContext.deleteSharedState('device');
        getDevices();
    }, []);

    const goToDeviceView = (device: Device) => {
        appContext.setSharedState('device', device);
        navigateTo(`/devices/${device.deviceId}`, device.name);
    };

    const addDevice = () => {
        navigateTo('/devices/search', 'Agregar dispositivo');
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Mis dispositivos</Text>
            {devices.map((device: Device) => (
                <View key={device.deviceId}>
                    <Text style={{ cursor: 'pointer' }} onPress={() => goToDeviceView(device)}>
                        {device.turnedOn ? '🟡' : '⚫'} {device.name}
                    </Text>
                </View>
            ))}
            <Button title="Agregar dispositivo" onPress={() => addDevice()} />
            <Text>Consumo de mis dispositivos</Text>
            <MeasuresChart appContext={appContext} />
        </View>
    );
};
