import { ControlMap, StyleControl, DataControl } from '@lib/controls';

export interface IChartOption {
  color: string[];
  series: Series[];
  title: ITitle;
  xAxis?: any;
  yAxis?: any;
}

export interface ITitle {
  show: boolean;
  text: string;
  subtext: string;
  textStyle: ITextStyle;
  subtextStyle: ITextStyle;
  x: 'left' | 'right' | 'center';
}

export interface ITextStyle {
  color: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'lighter';
}

export interface Series {
  [p: string]: any;
  data: Data[];
  type: string;
  name: string;
}

export type Data = number | IDataWithName;

export interface IDataWithName {
  value: number;
  name: string;
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

const defaultTitle: ITitle = {
  show: false,
  text: '',
  subtext: '',
  x: 'center',
  textStyle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'normal'
  },
  subtextStyle: {
    color: '#dedede',
    fontSize: 12,
    fontWeight: 'normal'
  }
};

export const pieList: ChartPreviewList = [
  {
    name: '普通饼图',
    imgSrc: require('../assets/image/normalpie.png'),
    controls: {
      style: [ControlMap.Palette, ControlMap.Title],
      data: [ControlMap.DataEditor]
    },
    option: {
      color: [],
      title: defaultTitle,
      series: [
        {
          name: '',
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
      style: [ControlMap.Palette, ControlMap.Title],
      data: [ControlMap.DataEditor]
    },
    imgSrc: require('../assets/image/normalbar.png'),
    option: {
      title: defaultTitle,
      color: [],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '',
        data: [120, 200, 150],
        type: 'bar'
      },
      {
        name: '',
        data: [120, 20, 150],
        type: 'bar'
      }
    ]
    }
  }
];