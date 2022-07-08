import React from 'react';
import { Text, View } from 'react-native';
import { DailyTask } from '../../models/scheduling/daily-task';
import { Weekdays } from '../../utils/weekdays';

export type DailyTaskComponentProps = {
    task: DailyTask;
};

export const DailyTaskComponent: React.FC<DailyTaskComponentProps> = ({
    task,
}) => {
    const renderWeekdays = () => {
        return Weekdays.all().map((weekday: number) => {
            const key = `${weekday}`;
            if (task.hasWeekday(weekday))
                return <Text key={key}>{Weekdays.map(weekday)}</Text>;
            return (
                <Text key={key} style={{ color: 'gray' }}>
                    {Weekdays.map(weekday)}
                </Text>
            );
        });
    };

    return (
        <View style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <Text>
                {task.isTurningOn() ? 'Encendido' : 'Apagado'} configurado a
                las{' '}
                <b>
                    {('0' + task.moment.getHours().toString()).slice(-2)}:
                    {('0' + task.moment.getMinutes().toString()).slice(-2)}
                </b>{' '}
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
    );
};
