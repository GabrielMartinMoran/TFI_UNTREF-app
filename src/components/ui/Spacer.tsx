import React from 'react';
import { View } from 'react-native';
import { parseStyle } from '../../utils/styles-parser';

export type SpacerProps = {
    margin?: string;
};

export const Spacer: React.FC<SpacerProps> = ({ margin = '1rem' }) => {
    return <View style={parseStyle({ margin: margin })} />;
};
