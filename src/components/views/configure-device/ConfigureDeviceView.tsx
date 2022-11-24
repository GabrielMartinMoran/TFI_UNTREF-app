import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { AuthRepository } from '../../../repositories/web-api/auth-repository';
import { DevicesRepository } from '../../../repositories/web-api/devices-repository';

export type ConfigureDeviceViewProps = {
    appContext: AppContext;
};

export const ConfigureDeviceViewceView: React.FC<ConfigureDeviceViewProps> = ({ appContext }) => {
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;
    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

    const navigate = useNavigate();

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
        navigate('/devices/networks');
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Configurar dispositivo</Text>
            <TextInput placeholder="Nombre del dispositivo" onChangeText={setDeviceName} />
            <Button title="Configurar" onPress={configureDevice} />
        </View>
    );
};
