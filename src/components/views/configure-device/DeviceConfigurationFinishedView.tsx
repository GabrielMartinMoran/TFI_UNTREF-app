import React from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../../app-context';
import { Button } from '../../ui/Button';
import { useAppNavigate } from '../../../hooks/use-app-navigate';
import { ROUTES } from '../../../routes';
import { parseStyle } from '../../../utils/styles-parser';
import { Spacer } from '../../ui/Spacer';

export type DeviceConfigurationFinishedViewProps = {
    appContext: AppContext;
};

export const DeviceConfigurationFinishedView: React.FC<DeviceConfigurationFinishedViewProps> = ({ appContext }) => {
    const { navigateTo } = useAppNavigate(appContext);

    const goToMyDevices = () => {
        navigateTo({ route: ROUTES.myDevices });
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
            <Text style={parseStyle({ fontSize: '1.3rem' })}>
                La configuración ha sido exitosa! Por favor, vuelve a conectarte a una red con acceso a internet para
                seguir utilizando la aplicación.
            </Text>
            <Spacer margin="0.5rem" />
            <Button title="Mis dispositivos" onPress={goToMyDevices} />
        </View>
    );
};
