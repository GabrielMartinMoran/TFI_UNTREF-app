import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { Button } from '../../ui/Button';
import { useAppNavigate } from '../../../hooks/use-app-navigate';
import { ROUTES } from '../../../routes';
import { MessageType } from '../../../models/message-type';
import { Spacer } from '../../ui/Spacer';
import { ActivityIndicator } from 'react-native-paper';
import { PALLETE } from '../../../pallete';

export type SearchDeviceViewProps = {
    appContext: AppContext;
};

let searchInterval: NodeJS.Timer | null = null;

export const SearchDeviceView: React.FC<SearchDeviceViewProps> = ({ appContext }) => {
    const SEARCH_INTERVAL_DELAY = 2000;
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;

    const { navigateTo } = useAppNavigate(appContext);

    const [isSearching, setIsSearching] = useState(false);
    const [deviceFound, setDeviceFound] = useState(false);

    const textStyle = { fontSize: '1.3rem' };

    const searchDevice = () => {
        setIsSearching(true);
        searchInterval = setInterval(async () => {
            const found = await deviceConfigurationRepository.searchDevice();
            if (found) onDeviceFound();
        }, SEARCH_INTERVAL_DELAY);
    };

    const stopDeviceSearch = () => {
        clearInterval(searchInterval!);
        setIsSearching(false);
    };

    const onDeviceFound = () => {
        stopDeviceSearch();
        setDeviceFound(true);
    };

    const configureDevice = async () => {
        const deviceId = await deviceConfigurationRepository.getDeviceId();
        if (deviceId) {
            appContext.showMessage('El dispositivo ya esta configurado!', MessageType.ERROR);
            return;
        }
        navigateTo({ route: ROUTES.configureDevice });
    };

    return (
        <View
            style={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '2rem',
                transform: 'translateY(-10%)',
            }}
        >
            {deviceFound ? (
                <>
                    <Text style={textStyle}>Dispositivo encontrado!</Text>
                    <Spacer margin="2rem" />
                    <Button title="Configurar" icon="cogs" fontSize="1.5rem" onPress={configureDevice} />
                </>
            ) : (
                <>
                    {isSearching ? (
                        <>
                            <Text style={textStyle}>Buscando dispositivo...</Text>
                            <Spacer margin="2rem" />
                            <ActivityIndicator animating={true} color={PALLETE.ACCENT} size="large" />
                            <Spacer margin="2rem" />
                            <Button
                                title="Detener búsqueda"
                                icon="compass-off-outline"
                                fontSize="1.5rem"
                                onPress={stopDeviceSearch}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={textStyle}>
                                Para buscar un dispositivo, conectate a la red del mismo y luego presiona{' '}
                                <b>Buscar dispositivo</b>.
                            </Text>
                            <Spacer margin="2rem" />
                            <Button
                                title="Buscar dispositivo"
                                icon="compass-outline"
                                fontSize="1.5rem"
                                onPress={searchDevice}
                            />
                        </>
                    )}
                </>
            )}
        </View>
    );
};
