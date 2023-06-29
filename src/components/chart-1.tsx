import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { px } from '../shared/px';
import { baseEchartOptions } from '../shared/base-echart-options';
import { createEchartsOptions } from '../shared/create-echarts-options';

export const Chart1 = () => {
  const divRef = useRef(null);
  var myChart = useRef(null);
  const data = [10, 20, 36, 41, 15, 26, 37, 18, 29];
  const x = (data) => {
    myChart.current.setOption(
      createEchartsOptions({
        xAxis: {
          data: [
            '兰州新区',
            '兰州新区',
            '兰州新区',
            '兰州新区',
            '兰州新区',
            '兰州新区',
            '兰州新区',
            '兰州新区',
            '兰州新区',
          ],
          axisTick: { show: false },
          axisLine: {
            lineStyle: { color: '#083B70' },
          },
          axisLabel: {
            formatter(val) {
              if (val.length > 2) {
                const array = val.split('');
                array.splice(2, 0, '\n');
                return array.join('');
              } else {
                return val;
              }
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            show: true,
            lineStyle: { color: '#083B70' },
          },
        },
        series: [
          {
            type: 'bar',
            data: data,
          },
        ],
      })
    );
  };
  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    x(data);
    setInterval(() => {
      const newData = [...data];
      for (let i = 0; i < 9; i++) {
        newData[i] = Math.round(Math.random() * 60) + 1;
      }
      x(newData);
    }, 1500);
  }, []);
  return (
    <div className="bordered 管辖统计">
      <h2>案发派出所管辖统计</h2>
      <div ref={divRef} className="chart"></div>
    </div>
  );
};
