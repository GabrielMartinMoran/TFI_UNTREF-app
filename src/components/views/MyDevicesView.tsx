import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { DevicesRepository } from '../../repositories/web-api/devices-repository';
import { MeasuresChart } from '../charts/MeasuresChart';

export type MyDevicesViewProps = {
    appContext: AppContext;
};

export const MyDevicesView: React.FC<MyDevicesViewProps> = ({ appContext }) => {
    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;

    const [devices, setDevices] = useState([] as Array<Device>);

    const navigate = useNavigate();

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
        navigate(`/devices/${device.deviceId}`);
    };

    const addDevice = () => {
        navigate('/devices/search');
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
