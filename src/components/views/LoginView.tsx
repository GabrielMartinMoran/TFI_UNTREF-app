import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { Button, ButtonType } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { TextInput } from '../ui/TextInput';
import { MessageType } from '../../models/message-type';
import { SectionTitle } from '../ui/SectionTitle';

export type LoginViewProps = {
    appContext: AppContext;
};

export const LoginView: React.FC<LoginViewProps> = ({ appContext }) => {
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { navigateTo } = useAppNavigate(appContext);

    const login = async () => {
        try {
            await authRepository.login(email, password);
            navigateTo({ route: ROUTES.home });
        } catch (error: any) {
            console.warn(error);
            appContext.showMessage('Usuario o contraseña incorrectos', MessageType.ERROR);
        }
    };

    const goToRegister = () => {
        navigateTo({ route: ROUTES.register });
    };

    return (
        <View>
            <SectionTitle text="Iniciar sesión" />
            <TextInput label="Correo electrónico" value={email} onChangeText={setEmail} />
            <View style={{ margin: '0.5rem' }} />
            <TextInput label="Contraseña" secureTextEntry={true} value={password} onChangeText={setPassword} />
            <View style={{ margin: '1rem' }} />
            <Button title="Ingresar" onPress={() => login()} disabled={!email || !password} />
            <View style={{ margin: '0.5rem' }} />
            <Button title="Ir a registrarse" onPress={() => goToRegister()} buttonType={ButtonType.ACCENT} />
        </View>
    );
};
