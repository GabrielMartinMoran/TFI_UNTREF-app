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
import { MessageType } from '../../../models/message-type';

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
        try {
            await deviceConfigurationRepository.configureNetwork(ssid, password);
            //appContext.showMessage('El dispositivo se configuro correctamente!', MessageType.SUCCESS);
        } catch (error) {
            console.log(error);
            appContext.showMessage('Ha ocurrido un error al tratar de configurar el dispositivo', MessageType.ERROR);
        }
        navigateTo({ route: ROUTES.deviceConfigurationFinished });
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
