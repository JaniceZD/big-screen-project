import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { createEchartsOptions } from '../shared/create-echarts-options';

export const Chart10 = () => {
  const divRef = useRef(null);
  const myChart = useRef(null);
  const data = [
    { type: '入室抢劫', num: 40 },
    { type: '当街偷盗', num: 22 },
    { type: '团伙诈骗', num: 20 },
    { type: '刑事案件', num: 18 },
    { type: '民事案件', num: 32 },
  ];
  const x = (data) => {
    myChart.current.setOption(
      createEchartsOptions({
        xAxis: {
          data: data.map((i) => i.type),
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
            data: data.map((i) => i.num),
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0A97FB',
              },
              {
                offset: 1,
                color: '#1E34FA',
              },
            ]),
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
      for (let i = 0; i < 5; i++) {
        newData[i].num = Math.random() * 40 + 10;
      }
      x(newData);
    }, 1500);
  }, []);

  return <div ref={divRef} className="chart"></div>;
};
