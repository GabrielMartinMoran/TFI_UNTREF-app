import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { Task } from '../../models/scheduling/task';
import { TaskActionPicker } from '../ui/TaskActionPicker';

export type EditTaskProps = {
    initialValue: Task;
    onSubmit: (task: Task) => void;
    onCancel: () => void;
};

export const EditTask: React.FC<EditTaskProps> = ({
    initialValue,
    onSubmit,
    onCancel,
}) => {
    const [task, setTask] = useState(initialValue.clone());
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);

    const handleTaskActionChange = (taskAction: string) => {
        task.action = taskAction;
        setTask(task.clone());
    };

    return (
        <View>
            <Text>Editar tarea programada</Text>
            <TaskActionPicker
                value={task.action}
                onChange={handleTaskActionChange}
            />
            <Button
                title={`${task.moment.toLocaleDateString()}`}
                onPress={() => setShowDateModal(true)}
            />
            <DatePickerModal
                locale="en"
                mode="single"
                visible={showDateModal}
                onDismiss={() => setShowDateModal(false)}
                date={task.moment}
                onConfirm={(params) => {
                    const date = params.date as Date;
                    task.moment.setFullYear(date.getFullYear());
                    task.moment.setMonth(date.getMonth());
                    task.moment.setDate(date.getDate());
                    setShowDateModal(false);
                    setTask(task.clone());
                }}
            />
            <Button
                title={`${task.moment.getHours()}:${task.moment.getMinutes()}`}
                onPress={() => setShowTimeModal(true)}
            />
            <TimePickerModal
                locale="es"
                visible={showTimeModal}
                hours={task.moment.getHours()}
                minutes={task.moment.getMinutes()}
                label="Fijar hora"
                cancelLabel="Cancelar"
                confirmLabel="Guardar"
                animationType="fade"
                onDismiss={() => setShowTimeModal(false)}
                onConfirm={({ hours, minutes }) => {
                    task.moment.setHours(hours);
                    task.moment.setMinutes(minutes);
                    setShowTimeModal(false);
                    setTask(task.clone());
                }}
            />
            <Button title="Aceptar" onPress={() => onSubmit(task)} />
            <Button title="Cancelar" onPress={() => onCancel()} />
        </View>
    );
};
