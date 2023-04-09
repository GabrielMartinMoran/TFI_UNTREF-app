import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { DevicesRepository } from '../../repositories/web-api/devices-repository';
import { DevicesActionsRepository } from '../../repositories/web-api/device-actions-repository';
import { MeasuresChart } from '../charts/MeasuresChart';
import { Button } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';

export type DeviceViewProps = {
    appContext: AppContext;
};

export const DeviceView: React.FC<DeviceViewProps> = ({ appContext }) => {
    const DEVICE_STATE_REQUEST_INTERVAL = 1000;

    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;
    const deviceActionsRepository = appContext.getRepository(DevicesActionsRepository) as DevicesActionsRepository;
    const device = appContext.getSharedState('device') as Device;

    const { deviceId } = useParams();

    const { navigateTo } = useAppNavigate(appContext);

    const [deviceTurnedOn, setDeviceTurnedOn] = useState(device.turnedOn);
    const [deviceStateRequestTimer, setDeviceStateRequestTimer] = useState(null as NodeJS.Timer | null);

    const getTurnedOn = async (): Promise<boolean> => {
        try {
            return await devicesRepository.isTurnedOn(device.deviceId);
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    useEffect(() => {
        const updateDeviceState = async () => {
            const isTurnedOn = await getTurnedOn();
            device.turnedOn = isTurnedOn;
            setDeviceTurnedOn(isTurnedOn);
        };

        updateDeviceState();
        setDeviceStateRequestTimer(setInterval(() => updateDeviceState(), DEVICE_STATE_REQUEST_INTERVAL));

        return () => {
            clearInterval(deviceStateRequestTimer as NodeJS.Timer);
            setDeviceStateRequestTimer(null);
        };
    }, []);

    const toggleDeviceState = async () => {
        try {
            const newState = !device.turnedOn;
            await deviceActionsRepository.sendStateAction(device.deviceId, newState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>
                {deviceTurnedOn ? '🟡' : '⚫'} {device.name}
            </Text>
            <Button title={deviceTurnedOn ? 'Apagar' : 'Encender'} onPress={() => toggleDeviceState()} />
            <Text onPress={() => navigateTo(`/devices/${deviceId}/scheduler`, 'Scheduler')}>📆 Scheduler</Text>
            <MeasuresChart appContext={appContext} deviceId={device.deviceId} />
        </View>
    );
};
