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

export type ConfigureDeviceViewProps = {
    appContext: AppContext;
};

export const ConfigureDeviceViewceView: React.FC<ConfigureDeviceViewProps> = ({ appContext }) => {
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
        // Send device_id to the device
        await deviceConfigurationRepository.setDeviceId(deviceId);
        // Generate device token
        const deviceToken = await authRepository.generateDeviceToken(deviceId);
        // Send the token to the device
        await deviceConfigurationRepository.setToken(deviceToken);
        // Navigate to the next stage of the configuration
        navigateTo({ route: ROUTES.searchDeviceNetworks });
    };

    return (
        <View>
            <SectionTitle text="Configurar dispositivo" />
            <TextInput label="Nombre del dispositivo" value={deviceName} onChangeText={setDeviceName} />
            <Spacer />
            <Button title="Configurar" onPress={configureDevice} />
        </View>
    );
};
