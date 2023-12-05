import React from 'react';
import { Button as RNPButton, Text as RNPText } from 'react-native-paper';
import { PALLETE } from '../../pallete';
import { parseStyle } from '../../utils/styles-parser';

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
            style={parseStyle(
                {
                    backgroundColor: PALLETE.PRIMARY,
                    borderRadius: 30,
                    position: 'absolute',
                    top: '80vh',
                    right: 20,
                    zIndex: 1,
                },
                {
                    position: 'relative',
                    zIndex: 1,
                    right: undefined,
                    top: undefined,
                    margin: '0.5rem',
                    marginTop: '1rem',
                }
            )}
            labelStyle={{
                color: PALLETE.BUTTONS_TEXT,
            }}
        >
            <RNPText
                style={parseStyle({
                    color: PALLETE.BUTTONS_TEXT,
                    fontWeight: '400',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '0.25rem',
                    marginBottom: '0.25rem',
                })}
            >
                {label.toUpperCase()}
            </RNPText>
        </RNPButton>
    );
};
