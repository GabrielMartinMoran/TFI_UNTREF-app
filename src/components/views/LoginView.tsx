import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';

export type LoginViewProps = {
    appContext: AppContext;
};

export const LoginView: React.FC<LoginViewProps> = ({ appContext }) => {
    const authRepository = appContext.getRepository(
        AuthRepository
    ) as AuthRepository;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        try {
            await authRepository.login(email, password);
            navigate('/home');
        } catch (error: any) {
            console.warn(error);
        }
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Iniciar sesión</Text>
            <TextInput
                placeholder="Correo electrónico"
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Button title="Ingresar" onPress={() => login()} />
            <Button title="Registrarse" onPress={() => goToRegister()} />
        </View>
    );
};
