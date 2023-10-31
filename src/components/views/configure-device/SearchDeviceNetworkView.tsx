import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';
import { ROUTES } from '../../../routes';
import { useAppNavigate } from '../../../hooks/use-app-navigate';
import { SectionTitle } from '../../ui/SectionTitle';
import { StateChip } from '../../ui/states/StateChip';
import { PALLETE } from '../../../pallete';

export type SearchDeviceNetworkViewProps = {
    appContext: AppContext;
};

export const SearchDeviceNetworkView: React.FC<SearchDeviceNetworkViewProps> = ({ appContext }) => {
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;

    const { navigateTo } = useAppNavigate(appContext);

    const [availableNetworks, setAvailableNetworks] = useState<string[]>([]);

    useEffect(() => {
        const init = async () => {
            const networks = await deviceConfigurationRepository.getAvailableNetworks();
            setAvailableNetworks(networks);
        };
        init();
    }, []);

    const configureNetwork = (ssid: string) => {
        appContext.setSharedState('selectedNetwork', ssid);
        navigateTo({ route: ROUTES.configureDeviceNetwork });
    };

    return (
        <View>
            <SectionTitle text="Seleccione la red WiFi a configurar" />
            {availableNetworks.map((ssid) => (
                <StateChip
                    key={ssid}
                    icon="wifi"
                    text={ssid}
                    color={PALLETE.PRIMARY}
                    onPress={() => configureNetwork(ssid)}
                    style={{
                        width: '100%',
                        marginBottom: '0.5rem',
                        height: '1.5rem',
                    }}
                />
            ))}
        </View>
    );
};
