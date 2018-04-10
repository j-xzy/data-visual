import { ControlMap, StyleControl, DataControl } from '@lib/controls';

export interface IChartOption {
  color: string[];
  series: any[];
  xAxis?: any;
  yAxis?: any;
}

export type StyleControls = StyleControl[];

export type DataControls = DataControl[];

export interface Controls {
  style: StyleControls;
  data: DataControls;
}

export interface IChartPreview {
  name: string;
  imgSrc: string;
  controls: Controls;
  option: IChartOption;
}

export type ChartPreviewList = IChartPreview[];

export const pieList: ChartPreviewList = [
  {
    name: '普通饼图',
    imgSrc: require('../assets/image/normalpie.png'),
    controls: {
      style: [ControlMap.Palette],
      data: [ControlMap.DataEditor]
    },
    option: {
      color: [],
      series: [
        {
          type: 'pie',
          radius: '55%',
          data: [
            { value: 35, name: '视频' },
            { value: 20, name: '邮件' },
            { value: 34, name: '广告' }
          ]
        }
      ]
    }
  }
];

export const barList: ChartPreviewList = [
  {
    name: '普通柱图',
    controls: {
      style: [ControlMap.Palette],
      data: [ControlMap.DataEditor]
    },
    imgSrc: require('../assets/image/normalbar.png'),
    option: {
      color: [],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150],
        type: 'bar'
      }]
    }
  }
];