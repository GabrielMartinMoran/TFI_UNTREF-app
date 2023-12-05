import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { DailyTask } from '../../models/scheduling/daily-task';
import { Weekdays } from '../../utils/weekdays';
import { parseStyle } from '../../utils/styles-parser';

export type DailyTaskComponentProps = {
    task: DailyTask;
    onPress: (task: DailyTask) => void;
};

export const DailyTaskComponent: React.FC<DailyTaskComponentProps> = ({ task, onPress }) => {
    const renderWeekdays = () => {
        return Weekdays.all().map((weekday: number) => {
            const key = `${weekday}`;
            if (task.hasWeekday(weekday)) return <Text key={key}>{Weekdays.map(weekday)}</Text>;
            return (
                <Text key={key} style={{ color: 'gray' }}>
                    {Weekdays.map(weekday)}
                </Text>
            );
        });
    };

    return (
        <TouchableHighlight onPress={() => onPress(task)}>
            <View style={parseStyle({ marginTop: '0.5rem', marginBottom: '0.5rem' })}>
                <Text>
                    {task.isTurningOn() ? 'Encendido' : 'Apagado'} configurado a las{' '}
                    <Text
                        style={parseStyle({
                            fontWeight: 'bold',
                        })}
                    >
                        {('0' + task.moment.getHours().toString()).slice(-2)}:
                        {('0' + task.moment.getMinutes().toString()).slice(-2)}
                    </Text>{' '}
                    los días:
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    {renderWeekdays()}
                </View>
            </View>
        </TouchableHighlight>
    );
};
