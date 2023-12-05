import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { LineChart as CKLineChart } from 'react-native-chart-kit';
import { LineChart as RELineChart, YAxis, XAxis, Line } from 'recharts';
import { isMobile } from '../../utils/platform-checker';
import { PALLETE } from '../../pallete';
import { parseStyle } from '../../utils/styles-parser';

export type ChartProps = {
    data: Array<any>;
    xDataKey: string;
    yDataKey: string;
    min: number;
    max: number;
    unit: string;
    lineColor: string;
};

export const Chart: React.FC<ChartProps> = ({ data, xDataKey, yDataKey, min, max, unit, lineColor }) => {
    if (isMobile()) {
        if (data.length == 0) return <></>;
        return (
            <CKLineChart
                data={{
                    labels: data.map((x) => x[xDataKey]),
                    datasets: [
                        {
                            data: data.map((x) => x[yDataKey]),
                        },
                        {
                            data: [min], // min
                            withDots: false,
                        },
                        {
                            data: [max], // max
                            withDots: false,
                        },
                    ],
                }}
                width={Dimensions.get('window').width} // from react-native
                height={400}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: PALLETE.BACKGROUND,
                    backgroundGradientFrom: PALLETE.BACKGROUND,
                    backgroundGradientTo: PALLETE.BACKGROUND,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `${lineColor}`,
                    labelColor: (opacity = 1) => `${PALLETE.SECONDARY_TEXT}`,
                    style: parseStyle({
                        marginTop: '5px',
                        marginRight: '0px',
                        marginLeft: '0px',
                        marginBottom: '5px',
                        paddingRight: '50px',
                    }),
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: lineColor,
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                withInnerLines={false}
                verticalLabelRotation={90}
                formatYLabel={(yValue: string) => {
                    let value = parseFloat(yValue);
                    const roundDecimals = (num: number) => Math.round(num * 100) / 100;
                    if (value > 1000) {
                        return `${roundDecimals(value / 1000)}K${unit}`;
                    }
                    return `${yValue}${unit}`;
                }}
            />
        );
    }

    return (
        <RELineChart
            width={Dimensions.get('window').width}
            height={400}
            margin={{ top: 5, right: 50, left: 0, bottom: 5 }}
            data={data}
        >
            <YAxis dataKey={yDataKey} domain={[min, max]} unit={unit} />
            <XAxis dataKey={xDataKey} />
            <Line type="natural" dataKey={yDataKey} stroke={lineColor} strokeWidth={2} />
        </RELineChart>
    );
};
