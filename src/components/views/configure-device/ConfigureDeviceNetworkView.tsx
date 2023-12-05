import React, { useState } from 'react';
import { View } from 'react-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { Button } from '../../ui/Button';
import { useAppNavigate } from '../../../hooks/use-app-navigate';
import { ROUTES } from '../../../routes';
import { SectionTitle } from '../../ui/SectionTitle';
import { TextInput } from '../../ui/TextInput';
import { parseStyle } from '../../../utils/styles-parser';
import { Spacer } from '../../ui/Spacer';

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
        navigateTo({ route: ROUTES.myDevices });
    };

    return (
        <View>
            <SectionTitle text={appContext.getSharedState('selectedNetwork')} />
            <TextInput
                label="Contraseña de la red"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Spacer margin="0.5rem" />
            <Button title="Guardar red" onPress={saveNetwork} />
        </View>
    );
};
