import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { useAppNavigate } from '../../hooks/use-app-navigate';

export type LogoutViewProps = {
    appContext: AppContext;
};

export const LogoutView: React.FC<LogoutViewProps> = ({ appContext }) => {
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

    const { navigateTo } = useAppNavigate(appContext);

    useEffect(() => {
        const logout = async () => {
            await authRepository.logout();
            navigateTo('/login');
        };

        logout();
    }, []);

    return <View></View>;
};
