import React from 'react';
import { Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';

export const enum ButtonType {
    PRIMARY,
    ACCENT,
    CHECK,
    CANCEL,
}

export type ButtonProps = {
    title: string;
    onPress?: () => void;
    buttonType?: ButtonType;
    icon?: string | undefined;
    fontSize?: string;
    width?: string;
};

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    buttonType = ButtonType.PRIMARY,
    icon = undefined,
    fontSize = '1rem',
    width = '100%',
}) => {
    const getBackgroundColor = () => {
        if (buttonType === ButtonType.PRIMARY) return PALLETE.PRIMARY;
        if (buttonType === ButtonType.CHECK) return PALLETE.SUCCESS;
        if (buttonType === ButtonType.CANCEL) return PALLETE.ERROR;
        return PALLETE.ACCENT;
    };

    return (
        <RNPButton
            icon={icon}
            mode="contained"
            onPress={onPress}
            uppercase={false}
            style={{
                backgroundColor: getBackgroundColor(),
                borderRadius: 30,
                width: width,
            }}
            labelStyle={{
                color: PALLETE.BUTTONS_TEXT,
                fontSize: fontSize,
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
