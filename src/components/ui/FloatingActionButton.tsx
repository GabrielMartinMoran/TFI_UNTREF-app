import React from 'react';
import { Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';

export type FloatingActionButtonProps = {
    label: string;
    onPress?: () => void;
    icon: string;
};

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ label, onPress, icon }) => {
    return (
        <RNPButton
            icon={icon}
            mode="contained"
            onPress={onPress}
            uppercase={false}
            style={{
                backgroundColor: PALLETE.PRIMARY,
                borderRadius: 30,
                position: 'fixed',
                bottom: 20,
                right: 20,
            }}
        >
            <RNPText
                style={{
                    color: PALLETE.BUTTONS_TEXT,
                    fontWeight: '400',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '0.25rem',
                    marginBottom: '0.25rem',
                }}
            >
                {label.toUpperCase()}
            </RNPText>
        </RNPButton>
    );
};
