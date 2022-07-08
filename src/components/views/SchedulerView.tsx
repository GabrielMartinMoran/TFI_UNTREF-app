import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { Task } from '../../models/scheduling/task';
import { SchedulerRepository } from '../../repositories/scheduler-repository';
import { DailyTask } from '../../models/scheduling/daily-task';
import { DailyTaskComponent } from '../scheduling/DailyTaskComponent';
import { TaskComponent } from '../scheduling/TaskComponent';

export type SchedulerViewProps = {
    appContext: AppContext;
};

export const SchedulerView: React.FC<SchedulerViewProps> = ({ appContext }) => {
    const schedulerRepository = appContext.getRepository(
        SchedulerRepository
    ) as SchedulerRepository;
    const device = appContext.getSharedState('device') as Device;
    const [tasks, setTasks] = useState([] as Array<Task>);

    console.log('Scheduler view');

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

    return (
        <View>
            {tasks.map((task: Task, i: number) =>
                task instanceof DailyTask ? (
                    <DailyTaskComponent key={`task-${i}`} task={task} />
                ) : (
                    <TaskComponent key={`task-${i}`} task={task} />
                )
            )}
        </View>
    );
};
