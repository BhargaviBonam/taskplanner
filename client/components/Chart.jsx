import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory-native';
import { chartData } from '../assets/data';

const Chart = () => {
  return (
    <VictoryChart>
      <VictoryAxis dependentAxis />
      <VictoryAxis />

      <VictoryBar
        data={chartData}
        x='name'
        y='total'
        labels={({ datum }) => datum.total}
        labelComponent={<VictoryTooltip />}
        style={{
          data: { fill: '#8884d8' },
        }}
      />
    </VictoryChart>
  );
};

export default Chart;
