import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { createEchartsOptions } from '../shared/create-echarts-options';
import { px } from '../shared/px';

export const Chart4 = () => {
  const divRef = useRef(null);
  const myChart = useRef(null);
  const data = [
    { hour: 0, probability: 0.15 },
    { hour: 2, probability: 0.13 },
    { hour: 4, probability: 0.11 },
    { hour: 6, probability: 0.13 },
    { hour: 8, probability: 0.14 },
    { hour: 10, probability: 0.15 },
    { hour: 12, probability: 0.16 },
    { hour: 14, probability: 0.18 },
    { hour: 16, probability: 0.21 },
    { hour: 18, probability: 0.19 },
    { hour: 20, probability: 0.17 },
    { hour: 22, probability: 0.16 },
    { hour: 24, probability: 0.15 },
  ];
  const x = (data) => {
    myChart.current.setOption(
      createEchartsOptions({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.map((i) => i.hour),
          splitLine: { show: true, lineStyle: { color: '#073E78' } },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: '#073E78' } },
          axisLabel: {
            formatter(val) {
              return val * 100 + '%';
            },
          },
        },
        series: [
          {
            type: 'line',
            data: data.map((i) => i.probability),
            symbol: 'circle',
            symbolSize: px(12),
            lineStyle: { width: px(2) },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#414a9f',
                },
                {
                  offset: 1,
                  color: '#1b1d52',
                },
              ]),
            },
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
      for (let i = 0; i < 13; i++) {
        newData[i].probability = Math.random() * 0.2 + 0.15;
      }
      x(newData);
    }, 1500);
  }, []);

  return (
    <div className="bordered 案发时段">
      <h2>案发时段分析</h2>
      <div ref={divRef} className="chart" />
    </div>
  );
};
