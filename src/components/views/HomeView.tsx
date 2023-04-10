import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Link } from 'react-router-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { Button, ButtonType } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';

export type HomeViewProps = {
    appContext: AppContext;
};

export const HomeView: React.FC<HomeViewProps> = ({ appContext }) => {
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

    const { navigateTo } = useAppNavigate(appContext);

    useEffect(() => {
        const checkLogged = async () => {
            if (!(await authRepository.isLogged())) {
                navigateTo({ route: ROUTES.login });
            }
        };

        checkLogged();
    }, []);

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Inicio</Text>
            <Text onPress={() => navigateTo({ route: ROUTES.myDevices })}>Mis dispositivos</Text>
            <Link to="/logout">
                <Text>Logout</Text>
            </Link>
            <Button title="Primary" onPress={() => {}} buttonType={ButtonType.PRIMARY} />
            <Button title="Accent" onPress={() => {}} buttonType={ButtonType.ACCENT} />
        </View>
    );
};
