import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { Button } from '../../ui/Button';
import { useAppNavigate } from '../../../hooks/use-app-navigate';
import { ROUTES } from '../../../routes';
import { MessageType } from '../../../models/message-type';

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
        <View>
            {deviceFound ? (
                <>
                    <Text>Dispositivo encontrado!</Text>
                    <Button title="Configurar" onPress={configureDevice} />
                </>
            ) : (
                <>
                    {isSearching ? (
                        <>
                            <Text>Buscando dispositivo...</Text>
                            <Button title="Detener búsqueda" onPress={stopDeviceSearch} />
                        </>
                    ) : (
                        <>
                            <Text>
                                Para buscar un dispositivo, conectate a la red del mismo y luego presiona{' '}
                                <b>Buscar dispositivo</b>
                            </Text>
                            <Button title="Buscar dispositivo" onPress={searchDevice} />
                        </>
                    )}
                </>
            )}
        </View>
    );
};
