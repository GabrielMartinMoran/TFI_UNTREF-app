import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { Button } from '../../ui/Button';
import { useAppNavigate } from '../../../hooks/use-app-navigate';

export type ConfigureDeviceNetworkViewProps = {
    appContext: AppContext;
};

export const ConfigureDeviceNetworkView: React.FC<ConfigureDeviceNetworkViewProps> = ({ appContext }) => {
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;

    const { navigateTo } = useAppNavigate(appContext);

    const [password, setPassword] = useState('');

    const saveNetwork = async () => {
        const ssid = appContext.getSharedState('selectedNetwork');
        await deviceConfigurationRepository.configureNetwork(ssid, password);
        navigateTo('/devices');
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>{appContext.getSharedState('selectedNetwork')}</Text>
            <TextInput placeholder="Contraseña de la red" secureTextEntry={true} onChangeText={setPassword} />
            <Button title="Guardar red" onPress={saveNetwork} />
        </View>
    );
};
