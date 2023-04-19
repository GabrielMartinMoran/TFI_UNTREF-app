import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PALLETE } from '../../pallete';

export type ConnectedStateChipProps = {
    isConnected: boolean;
};

export const ConnectedStateChip: React.FC<ConnectedStateChipProps> = ({ isConnected }) => {
    return (
        <View
            style={{
                width: '110px',
                borderRadius: '10px',
                borderColor: isConnected ? PALLETE.ACCENT : PALLETE.SECONDARY_TEXT,
                backgroundColor: isConnected ? `${PALLETE.ACCENT}20` : `${PALLETE.SECONDARY_TEXT}20`, // Decreses opacity
                borderStyle: 'solid',
                borderWidth: '1px',
                paddingLeft: '5px',
                paddingRight: '5px',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <Icon
                name={isConnected ? 'wifi' : 'wifi-off'}
                size="0.8rem"
                style={{
                    color: isConnected ? PALLETE.ACCENT : PALLETE.SECONDARY_TEXT,
                }}
            />
            <Text
                style={{
                    fontSize: '0.8rem',
                    color: isConnected ? PALLETE.ACCENT : PALLETE.SECONDARY_TEXT,
                    marginLeft: '0.2rem',
                }}
            >
                {isConnected ? 'Conectado' : 'Desconectado'}
            </Text>
        </View>
    );
};
