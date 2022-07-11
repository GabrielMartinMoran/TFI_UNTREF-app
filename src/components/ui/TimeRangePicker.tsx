import React, { useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
export type TimeRangePickerProps = {
    onChange: (minutesRange: number) => void;
};

const ranges = [
    {
        minutes: 5,
        display: '5 min',
    },
    {
        minutes: 30,
        display: '30 min',
    },
    {
        minutes: 60,
        display: '1 hora',
    },
    {
        minutes: 60 * 24,
        display: '1 día',
    },
    {
        minutes: 60 * 24 * 15,
        display: '15 días',
    },
    {
        minutes: 60 * 24 * 30,
        display: '30 días',
    },
];

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
    onChange,
}) => {
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
