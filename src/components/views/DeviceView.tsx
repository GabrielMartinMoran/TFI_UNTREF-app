import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { Measure } from '../../models/measure';
import { DevicesRepository } from '../../repositories/web-api/devices-repository';
import { Chart } from '../ui/Chart';
import { TimeRangePicker } from '../ui/TimeRangePicker';
import { DevicesActionsRepository } from '../../repositories/web-api/device-actions-repository';

export type DeviceViewProps = {
    appContext: AppContext;
};

export const DeviceView: React.FC<DeviceViewProps> = ({ appContext }) => {
    const MEASURES_REQUEST_INTERVAL = 5000;
    const DEVICE_STATE_REQUEST_INTERVAL = 1000;

    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;
    const deviceActionsRepository = appContext.getRepository(DevicesActionsRepository) as DevicesActionsRepository;
    const device = appContext.getSharedState('device') as Device;

    const { deviceId } = useParams();

    const [deviceTurnedOn, setDeviceTurnedOn] = useState(device.turnedOn);
    const [deviceMeasures, setDeviceMeasures] = useState([] as Array<Measure>);
    const [masuresRangeMinutesInterval, setMasuresRangeMinutesInterval] = useState(5);
    const [measuresRequestTimer, setMeasuresRequestTimer] = useState(null as NodeJS.Timer | null);
    const [deviceStateRequestTimer, setDeviceStateRequestTimer] = useState(null as NodeJS.Timer | null);

    const getDeviceMeasures = async (): Promise<Measure[]> => {
        try {
            return await devicesRepository.getMeasures(device.deviceId, masuresRangeMinutesInterval);
        } catch (error) {
            console.log(error);
        }
        return [];
    };

    const getTurnedOn = async (): Promise<boolean> => {
        try {
            return await devicesRepository.isTurnedOn(device.deviceId);
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    useEffect(() => {
        const updateMeasures = async () => {
            const measures = await getDeviceMeasures();
            setDeviceMeasures(measures);
        };

        updateMeasures();
        setMeasuresRequestTimer(setInterval(() => updateMeasures(), MEASURES_REQUEST_INTERVAL));

        const updateDeviceState = async () => {
            const isTurnedOn = await getTurnedOn();
            device.turnedOn = isTurnedOn;
            setDeviceTurnedOn(isTurnedOn);
        };

        updateDeviceState();
        setDeviceStateRequestTimer(setInterval(() => updateDeviceState(), DEVICE_STATE_REQUEST_INTERVAL));

        return () => {
            clearInterval(measuresRequestTimer as NodeJS.Timer);
            clearInterval(deviceStateRequestTimer as NodeJS.Timer);
            setMeasuresRequestTimer(null);
            setDeviceStateRequestTimer(null);
        };
    }, []);

    const handleRangePickerChange = async (range: number) => {
        setMasuresRangeMinutesInterval(range);
        const measures = await getDeviceMeasures();
        setDeviceMeasures(measures);
    };

    const calculateChartMax = (values: Array<number>) => {
        return Math.round(Math.max(...values) * 1.1 * 10.0) / 10.0;
    };

    const calculateChartMin = (values: Array<number>) => {
        const min = Math.min(...values);
        return Math.round((min - min * 0.1) * 10.0) / 10.0;
    };

    const mapTime = (date: Date) => {
        return `${date.getHours()}:${date.getMinutes()}`;
    };

    const toggleDeviceState = async () => {
        try {
            const newState = !device.turnedOn;
            await deviceActionsRepository.sendStateAction(device.deviceId, newState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>
                {deviceTurnedOn ? '🟡' : '⚫'} {device.name}
            </Text>
            <Button title={deviceTurnedOn ? 'Apagar' : 'Encender'} onPress={() => toggleDeviceState()} />
            <Link to={`/devices/${deviceId}/scheduler`}>
                <Text>📆 Scheduler</Text>
            </Link>
            <TimeRangePicker onChange={handleRangePickerChange} />
            <Text>Voltaje</Text>
            <Chart
                data={deviceMeasures.map((measure: Measure) => ({
                    time: mapTime(measure.timestamp),
                    voltage: measure.voltage,
                }))}
                xDataKey="time"
                yDataKey="voltage"
                min={calculateChartMin(deviceMeasures.map((measure: Measure) => measure.voltage))}
                max={calculateChartMax(deviceMeasures.map((measure: Measure) => measure.voltage))}
                unit="V"
                lineColor="#f5d742"
            />
            <Text>Corriente</Text>
            <Chart
                data={deviceMeasures.map((measure: Measure) => ({
                    time: mapTime(measure.timestamp),
                    current: measure.current,
                }))}
                xDataKey="time"
                yDataKey="current"
                min={calculateChartMin(deviceMeasures.map((measure: Measure) => measure.current))}
                max={calculateChartMax(deviceMeasures.map((measure: Measure) => measure.current))}
                unit="A"
                lineColor="#4287f5"
            />
            <Text>Potencia</Text>
            <Chart
                data={deviceMeasures.map((measure: Measure) => ({
                    time: mapTime(measure.timestamp),
                    power: measure.power,
                }))}
                xDataKey="time"
                yDataKey="power"
                min={calculateChartMin(deviceMeasures.map((measure: Measure) => measure.power))}
                max={calculateChartMax(deviceMeasures.map((measure: Measure) => measure.power))}
                unit="W"
                lineColor="#f54242"
            />
        </View>
    );
};
