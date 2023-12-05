import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PALLETE } from '../../../pallete';
import { StyleProp } from 'react-native';
import { parseStyle, pixelsToDp, remToPixels } from '../../../utils/styles-parser';
import { isMobile } from '../../../utils/platform-checker';

export type StateChipProps = {
    icon: string;
    text: string;
    color: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export const StateChip: React.FC<StateChipProps> = ({ icon, text, color, onPress = undefined, style = {} }) => {
    return (
        <TouchableRipple
            rippleColor="rgba(0, 0, 0, .32)"
            onPress={onPress}
            style={parseStyle(
                {
                    ...{
                        width: isMobile() ? '5rem' : '110px',
                        borderRadius: '10px',
                        borderColor: color,
                        backgroundColor: `${color}20`, // Decreses opacity
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        alignItems: 'center',
                        marginLeft: '0.25rem',
                        marginRight: '0.25rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        shadowColor: PALLETE.DRAWER_SHADOW,
                        shadowOffset: onPress ? { width: 1, height: 1 } : {},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                    },
                    ...style,
                }
            )}
        >
            <View
                style={parseStyle({
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                })}
            >
                <Icon
                    name={icon}
                    size={isMobile() ? pixelsToDp(remToPixels(0.8)) : '0.8rem'}
                    style={{
                        color: color,
                    }}
                />
                <Text
                    style={parseStyle({
                        fontSize: isMobile() ? '0.5rem' : '0.8rem',
                        color: color,
                        marginLeft: '0.2rem',
                    })}
                >
                    {text}
                </Text>
            </View>
        </TouchableRipple>
    );
};
