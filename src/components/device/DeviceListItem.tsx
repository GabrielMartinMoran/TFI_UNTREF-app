import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Device } from '../../models/device';
import { AppContext } from '../../app-context';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { StateChip } from '../ui/states/StateChip';
import { ConnectedStateChip } from '../ui/states/ConnectedStateChip';
import { TurnedOnStateChip } from '../ui/states/TurnedOnStateChip';
import { DevicesActionsRepository } from '../../repositories/web-api/device-actions-repository';
import { MessageType } from '../../models/message-type';

export type DeviceListItemProps = {
    appContext: AppContext;
    device: Device;
};

export const DeviceListItem: React.FC<DeviceListItemProps> = ({ appContext, device }) => {
    const deviceActionsRepository = appContext.getRepository(DevicesActionsRepository) as DevicesActionsRepository;

    const { navigateTo } = useAppNavigate(appContext);

    const goToDeviceView = (device: Device) => {
        appContext.setSharedState('device', device);
        navigateTo({
            route: ROUTES.device,
            params: { ':deviceId': device.deviceId },
            overriddenTitle: device.name,
        });
    };

    const setDeviceState = async (turnedOn: boolean) => {
        try {
            await deviceActionsRepository.sendStateAction(device.deviceId, turnedOn);
        } catch (error) {
            console.log(error);
            appContext.showMessage(
                `Ha ocurrido un error al tratar de ${turnedOn ? 'encender' : 'apagar'} el dispositivo ${device?.name}`,
                MessageType.ERROR
            );
        }
    };

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', margin: '0.5rem' }}>
                <Text style={{ cursor: 'pointer', fontSize: '1.2rem' }} onPress={() => goToDeviceView(device)}>
                    {device.name}
                </Text>
                <View style={{ flex: 1 }}></View>
                <TurnedOnStateChip
                    isTurnedOn={device.turnedOn}
                    isConnected={device.active}
                    onPress={() => setDeviceState(!device.turnedOn)}
                />
                <ConnectedStateChip isConnected={device.active} />
            </View>
        </View>
    );
};
