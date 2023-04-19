import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { Button } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { TextInput } from '../ui/TextInput';
import { MessageType } from '../../models/message-type';

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
            <Text style={{ fontSize: 30 }}>Iniciar sesión</Text>
            <TextInput label="Correo electrónico" value={email} onChangeText={setEmail} />
            <TextInput label="Contraseña" secureTextEntry={true} value={password} onChangeText={setPassword} />
            <Button title="Ingresar" onPress={() => login()} />
            <Button title="Registrarse" onPress={() => goToRegister()} />
        </View>
    );
};
