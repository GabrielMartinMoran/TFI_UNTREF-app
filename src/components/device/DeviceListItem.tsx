import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Device } from '../../models/device';
import { AppContext } from '../../app-context';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { ConnectedStateChip } from '../ui/ConnectedStateChip';

export type DeviceListItemProps = {
    appContext: AppContext;
    device: Device;
};

export const DeviceListItem: React.FC<DeviceListItemProps> = ({ appContext, device }) => {
    const { navigateTo } = useAppNavigate(appContext);

    const goToDeviceView = (device: Device) => {
        appContext.setSharedState('device', device);
        navigateTo({
            route: ROUTES.device,
            params: { ':deviceId': device.deviceId },
            overriddenTitle: device.name,
        });
    };

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.5rem',marginTop: '0.5rem' }}>
                <Text style={{ cursor: 'pointer' }} onPress={() => goToDeviceView(device)}>
                    {device.turnedOn ? '🟡' : '⚫'} {device.name}
                </Text>
                <View style={{ flex: 1 }}></View>
                <ConnectedStateChip isConnected={device.active} />
            </View>
        </View>
    );
};
