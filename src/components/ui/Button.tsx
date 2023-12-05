import React from 'react';
import { Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';
import { parseStyle } from '../../utils/styles-parser';

export const enum ButtonType {
    PRIMARY,
    ACCENT,
    CHECK,
    CANCEL,
    DELETE,
}

export type ButtonProps = {
    title: string;
    onPress?: () => void;
    buttonType?: ButtonType;
    icon?: string | undefined;
    fontSize?: string;
    width?: string;
    disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    buttonType = ButtonType.PRIMARY,
    icon = undefined,
    fontSize = '1rem',
    width = '100%',
    disabled = false,
}) => {
    const getBackgroundColor = () => {
        if (buttonType === ButtonType.PRIMARY) return PALLETE.PRIMARY;
        if (buttonType === ButtonType.CHECK) return PALLETE.SUCCESS;
        if (buttonType === ButtonType.CANCEL) return PALLETE.SECONDARY_TEXT;
        if (buttonType === ButtonType.DELETE) return PALLETE.ERROR;
        return PALLETE.ACCENT;
    };

    return (
        <RNPButton
            icon={icon}
            mode="contained"
            onPress={onPress}
            uppercase={false}
            style={parseStyle({
                backgroundColor: `${getBackgroundColor()}${disabled ? 'AB' : 'FF'}`,
                borderRadius: '30px',
                width: width == '100%' ? undefined : width,
            })}
            labelStyle={parseStyle({
                color: PALLETE.BUTTONS_TEXT,
                fontSize: fontSize,
            })}
            disabled={disabled}
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
