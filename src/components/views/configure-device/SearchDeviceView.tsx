import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { Button } from '../../ui/Button';

export type SearchDeviceViewProps = {
    appContext: AppContext;
};

let searchInterval: NodeJS.Timer | null = null;

export const SearchDeviceView: React.FC<SearchDeviceViewProps> = ({ appContext }) => {
    const SEARCH_INTERVAL_DELAY = 2000;
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;

    const navigate = useNavigate();

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
        if (deviceId) throw Error('El dispositivo ya esta configurado!');
        navigate(`/devices/configure`);
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
