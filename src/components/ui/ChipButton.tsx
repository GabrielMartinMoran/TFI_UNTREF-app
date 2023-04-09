import React from 'react';
import { Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';

export const enum ButtonType {
    PRIMARY,
    ACCENT,
}

export type ChipButtonProps = {
    title: string;
    onPress?: () => void;
    icon?: string | undefined;
    focused: boolean;
};

export const ChipButton: React.FC<ChipButtonProps> = ({ title, onPress, icon = undefined, focused = true }) => {
    return (
        <RNPButton
            icon={icon}
            mode={focused ? 'contained' : 'outlined'}
            onPress={onPress}
            uppercase={false}
            style={{
                backgroundColor: focused ? PALLETE.ACCENT : PALLETE.ACCENT_UNFOCUSED,
                borderRadius: 30,
                borderWidth: 0,
                width: 45,
            }}
            compact={true}
        >
            <RNPText
                style={{
                    color: focused ? PALLETE.BUTTONS_TEXT : PALLETE.ACCENT,
                    fontWeight: '400',
                    fontSize: '0.7rem',
                }}
            >
                {title}
            </RNPText>
        </RNPButton>
    );
};
