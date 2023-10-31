import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { MeasuresChart } from '../charts/MeasuresChart';
import { SectionTitle } from '../ui/SectionTitle';

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
            <SectionTitle text="Consumo de mis dispositivos" />
            <MeasuresChart appContext={appContext} />
        </View>
    );
};
