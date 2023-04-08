import React, { useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { CONFIG } from '../../config';
export type TimeRangePickerProps = {
    onChange: (minutesRange: number) => void;
};

const ranges = [
    CONFIG.TIME_RANGES['5_MINUTES'],
    CONFIG.TIME_RANGES['30_MINUTES'],
    CONFIG.TIME_RANGES['1_HOUR'],
    CONFIG.TIME_RANGES['1_DAY'],
    CONFIG.TIME_RANGES['15_DAYS'],
    CONFIG.TIME_RANGES['30_DAYS'],
];

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ onChange }) => {
    const [range, setRange] = useState(ranges[0]);

    const renderRanges = () => {
        return ranges.map((_range: any) => (
            <TouchableHighlight
                key={_range.display}
                onPress={() => {
                    setRange(_range);
                    onChange(_range.minutes);
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        backgroundColor: range === _range ? 'purple' : 'gray',
                    }}
                >
                    {_range.display}
                </Text>
            </TouchableHighlight>
        ));
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}
        >
            {renderRanges()}
        </View>
    );
};
