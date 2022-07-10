import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Weekdays } from '../../utils/weekdays';

export type WeekdaysPickerProps = {
    value: Array<number>;
    onChange: (weekdays: Array<number>) => void;
};

export const WeekdaysPicker: React.FC<WeekdaysPickerProps> = ({
    value,
    onChange,
}) => {
    const toggleWeekday = (weekday: number) => {
        const weekdays = [...value];
        const index = weekdays.indexOf(weekday);
        if (index !== -1) {
            weekdays.splice(index, 1);
        } else {
            weekdays.push(weekday);
            weekdays.sort();
        }
        onChange(weekdays);
    };

    const weekdayActive = (weekday: number): boolean => {
        return value.indexOf(weekday) !== -1;
    };

    const renderWeekdayButtons = () => {
        return Weekdays.all().map((weekday: number) => (
            <TouchableHighlight
                key={weekday}
                onPress={() => toggleWeekday(weekday)}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        backgroundColor: weekdayActive(weekday)
                            ? 'purple'
                            : 'gray',
                        borderRadius: 50,
                        width: '1.5rem',
                        height: '1.5rem',
                    }}
                >
                    {Weekdays.mapShort(weekday)}
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
            {renderWeekdayButtons()}
        </View>
    );
};
