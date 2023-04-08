import React from 'react';
import { Pressable, Text } from 'react-native';
import { PALLETE } from '../../pallete';

export const enum ButtonType {
    PRIMARY,
    ACCENT,
}

export type ButtonProps = {
    title: string;
    onPress?: () => void;
    type?: ButtonType | null;
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, type = ButtonType.PRIMARY }) => {
    const getPressableStyle = (): any => {
        return {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            margin: 5,
            backgroundColor: type === ButtonType.PRIMARY ? PALLETE.PRIMARY : PALLETE.ACCENT,
        };
    };

    const getTextStyle = (): any => {
        return {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        };
    };

    return (
        <Pressable onPress={onPress} style={getPressableStyle()}>
            <Text style={getTextStyle()}>{title}</Text>
        </Pressable>
    );
};
