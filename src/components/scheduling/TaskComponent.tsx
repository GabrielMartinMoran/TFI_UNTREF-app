import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Task } from '../../models/scheduling/task';
import { parseStyle } from '../../utils/styles-parser';

export type TaskComponentProps = {
    task: Task;
    onPress: (task: Task) => void;
};

export const TaskComponent: React.FC<TaskComponentProps> = ({ task, onPress }) => {
    return (
        <TouchableHighlight onPress={() => onPress(task)}>
            <View style={parseStyle({ marginTop: '0.5rem', marginBottom: '0.5rem' })}>
                <Text>
                    {task.isTurningOn() ? 'Encendido' : 'Apagado'} configurado el{' '}
                    <Text
                        style={parseStyle({
                            fontWeight: 'bold',
                        })}
                    >
                        {task.moment.toLocaleDateString()}
                    </Text>{' '}
                    a las{' '}
                    <Text
                        style={parseStyle({
                            fontWeight: 'bold',
                        })}
                    >
                        {('0' + task.moment.getHours().toString()).slice(-2)}:
                        {('0' + task.moment.getMinutes().toString()).slice(-2)}
                    </Text>
                </Text>
            </View>
        </TouchableHighlight>
    );
};
