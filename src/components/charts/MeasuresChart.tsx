import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../../app-context';
import { DevicesRepository } from '../../repositories/web-api/devices-repository';
import { Measure } from '../../models/measure';
import { CONFIG } from '../../config';
import { TimeRangePicker } from '../ui/TimeRangePicker';
import { Chart } from './Chart';
import { MessageType } from '../../models/message-type';
import { AuthRepository } from '../../repositories/web-api/auth-repository';

export type MeasuresChartProps = {
    appContext: AppContext;
    deviceId?: string;
};

export const MeasuresChart: React.FC<MeasuresChartProps> = ({ appContext, deviceId = null }) => {
    const MEASURES_REQUEST_INTERVAL = 5000;

    const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;
    const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;
    const [measures, setMeasures] = useState([] as Array<Measure>);
    const [masuresRangeMinutesInterval, setMasuresRangeMinutesInterval] = useState(5);

    // Ref for getting the last value in the setInterval
    const masuresRangeMinutesIntervalRef = useRef(masuresRangeMinutesInterval);
    masuresRangeMinutesIntervalRef.current = masuresRangeMinutesInterval;

    const fetchMeasures = async (range: number): Promise<Measure[]> => {
        try {
            if (deviceId) {
                return await devicesRepository.getMeasures(deviceId, range);
            } else {
                return await devicesRepository.getAllDevicesMeasures(range);
            }
        } catch (error) {
            console.error(error);
            appContext.showMessage(
                'Ha ocurrido un error al tratar de obtener muestras del servidor',
                MessageType.ERROR
            );
        }
        return [];
    };

    const updateMeasures = async () => {
        if (!(await authRepository.isLogged())) return;
        const measures = await fetchMeasures(masuresRangeMinutesIntervalRef.current);
        setMeasures(measures);
    };

    useEffect(() => {
        updateMeasures();
        const interval = setInterval(() => updateMeasures(), MEASURES_REQUEST_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const handleRangePickerChange = async (range: number) => {
        setMasuresRangeMinutesInterval(range);
        const measures = await fetchMeasures(range);
        setMeasures(measures);
    };

    const calculateChartMax = (values: Array<number>) => {
        return Math.round(Math.max(...values) * 1.1 * 10.0) / 10.0;
    };

    const calculateChartMin = (values: Array<number>) => {
        const min = Math.min(...values);
        return Math.round((min - min * 0.1) * 10.0) / 10.0;
    };

    const zeroPad = (n: number, digits: number) => n.toString().padStart(digits, '0');

    const mapTime = (date: Date) => {
        if (masuresRangeMinutesInterval >= CONFIG.TIME_RANGES['1_DAY'].minutes) {
            return (
                `${zeroPad(date.getDate(), 2)}/` +
                `${zeroPad(date.getMonth(), 2)}/` +
                `${zeroPad(date.getFullYear() % 100, 2)} ` +
                `${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`
            );
        }
        return `${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`;
    };

    return (
        <View>
            <TimeRangePicker onChange={handleRangePickerChange} />
            <Text>Corriente</Text>
            <Chart
                data={measures.map((measure: Measure) => ({
                    time: mapTime(measure.timestamp),
                    current: measure.current,
                }))}
                xDataKey="time"
                yDataKey="current"
                min={calculateChartMin(measures.map((measure: Measure) => measure.current))}
                max={calculateChartMax(measures.map((measure: Measure) => measure.current))}
                unit="A"
                lineColor="#4287f5"
            />
            <Text>Potencia</Text>
            <Chart
                data={measures.map((measure: Measure) => ({
                    time: mapTime(measure.timestamp),
                    power: measure.power,
                }))}
                xDataKey="time"
                yDataKey="power"
                min={calculateChartMin(measures.map((measure: Measure) => measure.power))}
                max={calculateChartMax(measures.map((measure: Measure) => measure.power))}
                unit="W"
                lineColor="#f54242"
            />
        </View>
    );
};
