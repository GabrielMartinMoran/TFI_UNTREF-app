import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { DevicesRepository } from '../../repositories/web-api/devices-repository';
import { DevicesActionsRepository } from '../../repositories/web-api/device-actions-repository';
import { MeasuresChart } from '../charts/MeasuresChart';
import { Button, ButtonType } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { TurnedOnStateChip } from '../ui/states/TurnedOnStateChip';
import { ConnectedStateChip } from '../ui/states/ConnectedStateChip';
import { MessageType } from '../../models/message-type';
import { FloatingActionButton } from '../ui/FloatingActionButton';

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

    const getTurnedOn = async (): Promise<boolean> => {
        try {
            return await devicesRepository.isTurnedOn(device.deviceId);
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    const updateDeviceState = async () => {
        const isTurnedOn = await getTurnedOn();
        device.turnedOn = isTurnedOn;
        setDeviceTurnedOn(isTurnedOn);
    };

    useEffect(() => {
        updateDeviceState();
        const interval = setInterval(() => updateDeviceState(), DEVICE_STATE_REQUEST_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const setDeviceState = async (turnedOn: boolean) => {
        try {
            await deviceActionsRepository.sendStateAction(device.deviceId, turnedOn);
        } catch (error) {
            console.log(error);
            appContext.showMessage(
                `Ha ocurrido un error al tratar de ${turnedOn ? 'encender' : 'apagar'} el dispositivo ${device.name}`,
                MessageType.ERROR
            );
        }
    };

    return (
        <View style={{ marginTop: '1rem' }}>
            <View style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.5rem' }}>
                <Text style={{ cursor: 'pointer', fontSize: 30 }}>{device.name}</Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '1.5rem',
                        marginTop: '0.5rem',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                    }}
                >
                    <ConnectedStateChip isConnected={device.active} />
                    <TurnedOnStateChip
                        isTurnedOn={device.turnedOn}
                        isConnected={device.active}
                        onPress={() => setDeviceState(!device.turnedOn)}
                    />
                </View>
            </View>
            <Text style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Detalle de consumo</Text>
            <MeasuresChart appContext={appContext} deviceId={device.deviceId} />
            <View style={{ margin: '1.5rem' }} />
            <FloatingActionButton
                label="Programar encendido / apagado"
                icon="calendar"
                onPress={() =>
                    navigateTo({
                        route: ROUTES.deviceScheduler,
                        params: { ':deviceId': device.deviceId },
                    })
                }
            />
        </View>
    );
};
