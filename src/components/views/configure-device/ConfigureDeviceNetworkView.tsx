import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';

export type ConfigureDeviceNetworkViewProps = {
    appContext: AppContext;
};

export const ConfigureDeviceNetworkView: React.FC<ConfigureDeviceNetworkViewProps> = ({ appContext }) => {
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;

    const navigate = useNavigate();

    const [password, setPassword] = useState('');

    const saveNetwork = async () => {
        const ssid = appContext.getSharedState('selectedNetwork');
        await deviceConfigurationRepository.configureNetwork(ssid, password);
        navigate('/devices');
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>{appContext.getSharedState('selectedNetwork')}</Text>
            <TextInput placeholder="Contraseña de la red" secureTextEntry={true} onChangeText={setPassword} />
            <Button title="Guardar red" onPress={saveNetwork} />
        </View>
    );
};
