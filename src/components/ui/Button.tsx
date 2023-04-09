import React from 'react';
import { Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';

export const enum ButtonType {
    PRIMARY,
    ACCENT,
}

export type ButtonProps = {
    title: string;
    onPress?: () => void;
    buttonType?: ButtonType;
    icon?: string | undefined;
};

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    buttonType = ButtonType.PRIMARY,
    icon = undefined,
}) => {
    return (
        <RNPButton
            icon={icon}
            mode="contained"
            onPress={onPress}
            uppercase={false}
            style={{
                backgroundColor: buttonType === ButtonType.PRIMARY ? PALLETE.PRIMARY : PALLETE.ACCENT,
                borderRadius: 30,
            }}
        >
            <RNPText
                style={{
                    color: PALLETE.BUTTONS_TEXT,
                    fontWeight: '400',
                }}
            >
                {title}
            </RNPText>
        </RNPButton>
    );
};
