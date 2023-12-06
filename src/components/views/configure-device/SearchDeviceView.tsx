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
import { parseStyle } from '../../../utils/styles-parser';
import { useParams } from 'react-router-native';

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

    const { deviceId, deviceToken } = useParams();

    const [isSearching, setIsSearching] = useState(false);
    const [deviceFound, setDeviceFound] = useState(false);

    const textStyle = parseStyle({ fontSize: '1.3rem' });

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
        const currentDeviceId = await deviceConfigurationRepository.getDeviceId();
        if (currentDeviceId) {
            appContext.showMessage('El dispositivo ya esta configurado!', MessageType.ERROR);
            return;
        }
        try {
            // Send device_id to the device
            await deviceConfigurationRepository.setDeviceId(deviceId!);
            // Send the token to the device
            await deviceConfigurationRepository.setToken(deviceToken!);
            // Navigate to the next stage of the configuration
        } catch (error) {
            console.log(error);
            appContext.showMessage('Ha ocurrido un error al tratar de configurar el dispositivo', MessageType.ERROR);
        }

        navigateTo({
            route: ROUTES.searchDeviceNetworks,
        });
    };

    return (
        <View
            style={parseStyle(
                {
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    margin: '2rem',
                    transform: 'translateY(-10%)',
                },
                {
                    paddingTop: '3rem',
                    marginBottom: '3rem',
                    transform: 'translateY(0px)',
                    height: undefined,
                }
            )}
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
                                Ahora se procederá con la búsqueda del dispositivo a agregar. Por favor, conectate a la
                                red del mismo y luego presiona{' '}
                                <Text
                                    style={parseStyle({
                                        fontWeight: 'bold',
                                    })}
                                >
                                    Buscar dispositivo
                                </Text>
                                .
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
