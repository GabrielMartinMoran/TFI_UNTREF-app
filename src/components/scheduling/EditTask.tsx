import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { Task } from '../../models/scheduling/task';
import { TaskActionPicker } from '../ui/TaskActionPicker';
import { Button, ButtonType } from '../ui/Button';
import { Spacer } from '../ui/Spacer';
import { SectionTitle } from '../ui/SectionTitle';

export type EditTaskProps = {
    initialValue: Task;
    onSubmit: (task: Task) => void;
    onCancel: () => void;
};

export const EditTask: React.FC<EditTaskProps> = ({ initialValue, onSubmit, onCancel }) => {
    const [task, setTask] = useState(initialValue.clone());
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);

    const handleTaskActionChange = (taskAction: string) => {
        task.action = taskAction;
        setTask(task.clone());
    };

    return (
        <View>
            <TaskActionPicker value={task.action} onChange={handleTaskActionChange} />
            <Spacer />
            <Button title={`${task.moment.toLocaleDateString()}`} onPress={() => setShowDateModal(true)} />
            <Spacer />
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
            <Spacer />
            <Button
                title={`${('0' + task.moment.getHours().toString()).slice(-2)}:${(
                    '0' + task.moment.getMinutes().toString()
                ).slice(-2)}`}
                onPress={() => setShowTimeModal(true)}
            />
            <Spacer />
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
            <Spacer />
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Button
                    title="Guardar"
                    icon="check"
                    buttonType={ButtonType.CHECK}
                    width="12rem"
                    onPress={() => onSubmit(task)}
                />
                <Spacer />
                <Button
                    title="Cancelar"
                    icon="cancel"
                    buttonType={ButtonType.CANCEL}
                    width="12rem"
                    onPress={() => onCancel()}
                />
            </View>
        </View>
    );
};
