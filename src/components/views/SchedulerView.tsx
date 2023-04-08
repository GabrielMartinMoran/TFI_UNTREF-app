import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { Task } from '../../models/scheduling/task';
import { SchedulerRepository } from '../../repositories/web-api/scheduler-repository';
import { TaskList } from '../scheduling/TaskList';
import { useNavigate, useParams } from 'react-router-native';
import { Button } from '../ui/Button';

export type SchedulerViewProps = {
    appContext: AppContext;
};

export const SchedulerView: React.FC<SchedulerViewProps> = ({ appContext }) => {
    const schedulerRepository = appContext.getRepository(SchedulerRepository) as SchedulerRepository;
    const device = appContext.getSharedState('device') as Device;
    const { deviceId } = useParams();
    const [tasks, setTasks] = useState([] as Array<Task>);
    const navigate = useNavigate();

    const getTasks = async (): Promise<Task[]> => {
        try {
            return await schedulerRepository.get(device.deviceId);
        } catch (error) {
            console.log(error);
        }
        return [];
    };

    useEffect(() => {
        const obtainTasks = async () => {
            setTasks(await getTasks());
        };

        obtainTasks();
    }, []);

    const goToTaskEditor = () => {
        navigate(`/devices/${deviceId}/scheduler/task`);
    };

    const handleEditTask = (task: Task) => {
        appContext.setSharedState('tasks', tasks);
        appContext.setSharedState('editedTaskIndex', tasks.indexOf(task));
        goToTaskEditor();
    };

    const handleCreateTask = () => {
        appContext.setSharedState('tasks', tasks);
        appContext.setSharedState('editedTaskIndex', null);
        goToTaskEditor();
    };

    return (
        <View>
            <TaskList tasks={tasks} onTaskPress={handleEditTask} />
            <Button title="Crear configuración" onPress={handleCreateTask} />
        </View>
    );
};
