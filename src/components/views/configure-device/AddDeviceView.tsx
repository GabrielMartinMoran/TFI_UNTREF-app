import React, { useState } from 'react';
import { View } from 'react-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { AuthRepository } from '../../../repositories/web-api/auth-repository';
import { DevicesRepository } from '../../../repositories/web-api/devices-repository';
import { Button } from '../../ui/Button';
import { ROUTES } from '../../../routes';
import { useAppNavigate } from '../../../hooks/use-app-navigate';
import { TextInput } from '../../ui/TextInput';
import { SectionTitle } from '../../ui/SectionTitle';
import { parseStyle } from '../../../utils/styles-parser';
import { Spacer } from '../../ui/Spacer';

export type AddDeviceViewProps = {
    appContext: AppContext;
};

export const AddDeviceViewceView: React.FC<AddDeviceViewProps> = ({ appContext }) => {
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;
    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

    const { navigateTo } = useAppNavigate(appContext);

    const [deviceName, setDeviceName] = useState('');

    const configureDevice = async () => {
        // Generate device_id
        const deviceId = await devicesRepository.create(deviceName);
        // Generate device token
        const deviceToken = await authRepository.generateDeviceToken(deviceId);
        // Navigate to the next stage of the configuration
        navigateTo({
            route: ROUTES.searchDevices,
            params: {
                ':deviceId': deviceId,
                ':deviceToken': deviceToken,
            },
        });
    };

    return (
        <View>
            <SectionTitle text="Agregar dispositivo" />
            <TextInput label="Nombre del dispositivo a agregar" value={deviceName} onChangeText={setDeviceName} />
            <Spacer />
            <Button title="Continuar" onPress={configureDevice} />
        </View>
    );
};
