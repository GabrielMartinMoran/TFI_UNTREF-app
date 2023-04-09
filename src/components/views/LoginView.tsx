import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { Button } from '../ui/Button';
import { useAppNavigate } from '../../hooks/use-app-navigate';

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
            navigateTo('/home');
        } catch (error: any) {
            console.warn(error);
        }
    };

    const goToRegister = () => {
        navigateTo('/register');
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Iniciar sesión</Text>
            <TextInput placeholder="Correo electrónico" onChangeText={setEmail} />
            <TextInput placeholder="Contraseña" secureTextEntry={true} onChangeText={setPassword} />
            <Button title="Ingresar" onPress={() => login()} />
            <Button title="Registrarse" onPress={() => goToRegister()} />
        </View>
    );
};
