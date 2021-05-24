import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from './globalTrendNew.json';

export default function GlobalTrend() {
  const [option, SetOption] = useState(undefined);

  const initOption = () => ({
    // title: {
    //   text: '全球疫情趋势',
    // },
    backgroundColor:"#242a38",
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['累计确诊', '新增确诊'],
      textStyle: {
        color: "#FFF"
      },
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: 'time',
        boundaryGap: false,
        axisLabel:{
          textStyle: {
            color: "#FFF"
          },
        }
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '人数',
        axisLabel:{
          textStyle: {
            color: "#FFF"
          },
        }
      },
      {
        type: 'value',
        name: '人数',
        axisLabel:{
          textStyle: {
            color: "#FFF"
          },
        }
      },
    ],
    series: [
      {
        name: '累计确诊',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default',
            },
          },
        },
        data: (() => {
          return data.date.map((v, i) => [v, data.acc[i]]);
        })(),
      },
      {
        name: '新增确诊',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default',
            },
          },
        },
        data: (() => {
          return data.date.map((v, i) => [v, data.new[i]]);
        })(),
        yAxisIndex: 1,
      },
    ],
  });

  useEffect(() => {
    SetOption(initOption());
  }, []);

  return (
    <div className="global-trend-comp" style={{ height: '100%' }}>
      {option && (
        <ReactEcharts option={option} style={{ height: "100%" }} />
      )}
    </div>
  );
}
