import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../ui/Button';

export type RegisterViewProps = {
};

export const RegisterView: React.FC<RegisterViewProps> = ({}) => {

  return (
    <View>
        <Text style={{fontSize: 30}}>Registrarse</Text>
        <TextInput placeholder='Nombre completo'></TextInput>
        <TextInput placeholder='Correo electrónico'></TextInput>
        <TextInput placeholder='Contraseña' secureTextEntry={true}></TextInput>
        <TextInput placeholder='Repetir contraseña' secureTextEntry={true}></TextInput>
        <Button title='Registrarse'/>
    </View>
  );
};