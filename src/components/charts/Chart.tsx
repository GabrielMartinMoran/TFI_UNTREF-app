import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart, YAxis, XAxis, Line } from 'recharts';

export type ChartProps = {
    data: Array<any>;
    xDataKey: string;
    yDataKey: string;
    min: number;
    max: number;
    unit: string;
    lineColor: string;
};

export const Chart: React.FC<ChartProps> = ({
    data,
    xDataKey,
    yDataKey,
    min,
    max,
    unit,
    lineColor,
}) => {
    return (
        <LineChart
            width={Dimensions.get('window').width}
            height={400}
            margin={{ top: 5, right: 50, left: 0, bottom: 5 }}
            data={data}
        >
            <YAxis dataKey={yDataKey} domain={[min, max]} unit={unit}/>
            <XAxis dataKey={xDataKey} />
            <Line
                type="natural"
                dataKey={yDataKey}
                stroke={lineColor}
                strokeWidth={2}
            />
        </LineChart>
    );
};
