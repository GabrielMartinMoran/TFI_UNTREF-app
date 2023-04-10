import React from 'react';
import { TextInput as RNPTextInput } from 'react-native-paper';
import { PALLETE } from '../../pallete';

export type TextInputProps = {
    label: string;
    onChangeText: (text: string) => void;
    value?: string;
};

export const TextInput: React.FC<TextInputProps> = ({ label, onChangeText, value = '' }) => {
    return <RNPTextInput label={label} value={value} onChangeText={onChangeText}></RNPTextInput>;
};
