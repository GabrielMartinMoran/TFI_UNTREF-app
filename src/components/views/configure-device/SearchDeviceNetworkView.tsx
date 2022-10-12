import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../../app-context';
import { DeviceConfigurationRepository } from '../../../repositories/device-api/device-configuration-repository';

export type SearchDeviceNetworkViewProps = {
    appContext: AppContext;
};

export const SearchDeviceNetworkView: React.FC<SearchDeviceNetworkViewProps> = ({ appContext }) => {
    const deviceConfigurationRepository = appContext.getRepository(
        DeviceConfigurationRepository
    ) as DeviceConfigurationRepository;

    const navigate = useNavigate();

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
        navigate('/devices/network');
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Seleccione la red WiFi a configurar</Text>
            {availableNetworks.map((ssid) => (
                <Text key={ssid} onPress={() => configureNetwork(ssid)}>
                    {ssid}
                </Text>
            ))}
        </View>
    );
};
