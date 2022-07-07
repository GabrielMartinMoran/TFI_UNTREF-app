import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Text, TextInput, View } from 'react-native';
import { useParams } from 'react-router-native';
import { AppContext } from '../../app-context';
import { Device } from '../../models/device';
import { Measure } from '../../models/measure';
import { DevicesRepository } from '../../repositories/devices-repository';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export type DeviceViewProps = {
  appContext: AppContext
};

export const DeviceView: React.FC<DeviceViewProps> = ({ appContext }) => {

  const MEASURES_REQUEST_INTERVAL = 5000;
  const devicesRepository = appContext.getRepository(DevicesRepository) as DevicesRepository;
  const device = appContext.getSharedState('device') as Device;
  let timeInterval: number = 5; // Minutes
  let requestsInterval: any = null;
  const { deviceId } = useParams();
  const [deviceMeasures, setDeviceMeasures] = useState([] as Array<Measure>);


  const getDeviceMeasures = async (): Promise<Measure[]> => {
    try {
      console.log('Getting measures');
      return await devicesRepository.getMeasures(device.deviceId, timeInterval);
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  useEffect(() => {
    const updateMeasures = async () => {
      const measures = await getDeviceMeasures();
      setDeviceMeasures(measures);
    };

    updateMeasures();
    requestsInterval = setInterval(() => updateMeasures(), MEASURES_REQUEST_INTERVAL);

    return () => {
      clearInterval(requestsInterval);
    }
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 30 }}>{device.turnedOn ? '🟡' : '⚫'} {device.name}</Text>
      {
        deviceMeasures.map((measure: Measure) => (<View key={measure.timestamp.toString()}>
          <Text>🕛 {measure.timestamp.toLocaleString()}</Text>
          <Text>🔌 Voltaje: {measure.voltage}</Text>
          <Text>⚡ Corriente: {measure.current}</Text>
          <Text>📈 Potencia: {measure.power}</Text>
        </View>))
      }
      <LineChart width={Dimensions.get('window').width} height={400}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        data={
          deviceMeasures.map((measure: Measure) => ({
            time: measure.timestamp.toLocaleTimeString(),
            voltage: measure.voltage
          })
          )}>
        <YAxis dataKey="voltage" domain={[
          Math.min(...deviceMeasures.map((measure: Measure) => measure.voltage)),
          Math.max(...deviceMeasures.map((measure: Measure) => measure.voltage)),
        ]} />
        <XAxis dataKey="time" />
        <Line type="monotone" dataKey="voltage" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </View>
  );
};