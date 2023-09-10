import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import { AuthRepository } from '../../repositories/web-api/auth-repository';
import { AppContext } from '../../app-context';
import { useAppNavigate } from '../../hooks/use-app-navigate';
import { ROUTES } from '../../routes';
import { MessageType } from '../../models/message-type';

export type RegisterViewProps = {
    appContext: AppContext;
};

export const RegisterView: React.FC<RegisterViewProps> = ({ appContext }) => {
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRrepeatedPassword] = useState('');

    const { navigateTo } = useAppNavigate(appContext);

    const register = async () => {
        try {
            await authRepository.register(name, email, password);
        } catch (error: any) {
            console.warn(error);
            appContext.showMessage('Ha ocurrido un error al realizar el registro', MessageType.ERROR);
            return;
        }
        try {
            await authRepository.login(email, password);
            navigateTo({ route: ROUTES.home });
        } catch (error: any) {
            console.warn(error);
            appContext.showMessage(
                'Ha ocurrido un error al iniciar sesión con el usuario registrado',
                MessageType.ERROR
            );
        }
    };

    return (
        <View>
            <SectionTitle text="Registrarse" />
            <TextInput label="Nombre completo" value={name} onChangeText={setName} />
            <View style={{ margin: '0.5rem' }} />
            <TextInput label="Correo electrónico" value={email} onChangeText={setEmail} />
            <View style={{ margin: '0.5rem' }} />
            <TextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={true} />
            <View style={{ margin: '0.5rem' }} />
            <TextInput
                label="Repetir contraseña"
                value={repeatedPassword}
                onChangeText={setRrepeatedPassword}
                secureTextEntry={true}
            />
            <View style={{ margin: '1rem' }} />
            <Button
                title="Registrarse"
                onPress={() => register()}
                disabled={!name || !email || !password || password !== repeatedPassword}
            />
        </View>
    );
};
