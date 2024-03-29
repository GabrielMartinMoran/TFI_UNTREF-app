import React from 'react';
import { Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';
import { parseStyle } from '../../utils/styles-parser';
import { isMobile } from '../../utils/platform-checker';

export const enum ButtonType {
    PRIMARY,
    ACCENT,
}

export type ChipButtonProps = {
    title: string;
    onPress?: () => void;
    icon?: string | undefined;
    focused: boolean;
    fontSize?: string;
    width?: string;
};

export const ChipButton: React.FC<ChipButtonProps> = ({
    title,
    onPress,
    icon = undefined,
    focused = true,
    fontSize = '1rem',
    width = undefined,
}) => {
    return (
        <RNPButton
            icon={icon}
            mode={focused ? 'contained' : 'outlined'}
            onPress={onPress}
            uppercase={false}
            style={parseStyle({
                backgroundColor: focused ? PALLETE.ACCENT : PALLETE.ACCENT_UNFOCUSED,
                borderRadius: 30,
                borderWidth: 0,
                width: width === undefined ? (!isMobile() ? 'fit-content' : width) : width,
            })}
            compact={true}
            labelStyle={parseStyle({
                fontSize: fontSize,
            })}
        >
            <RNPText
                style={parseStyle({
                    color: focused ? PALLETE.BUTTONS_TEXT : PALLETE.ACCENT,
                    fontWeight: '400',
                    marginLeft: '0.2rem',
                    marginRight: '0.2rem',
                })}
            >
                {title}
            </RNPText>
        </RNPButton>
    );
};
