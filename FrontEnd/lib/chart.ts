import { ControlMap, StyleControl, DataControl } from '@lib/controls';

export interface IChartOption {
  color: string[];
  series: Series[];
  title: ITitle;
  legend: ILegend;
  xAxis?: IAxis;
  yAxis?: IAxis;
}

export interface ISeriesItemTemplate extends Partial<Series> {
  data: Data[];
  type: string;
  name: string;
}

export interface IAxis {
  show: boolean;
  name: string;
  data?: string[];
  type: 'value' | 'category' | 'log';
  nameTextStyle: INameTextStyle;
  axisLine: {
    lineStyle: {
      color: string;
      width: number;
      type: 'solid' | 'dashed' | 'dotted';
    }
  };
}

export interface INameTextStyle extends ITextStyle {
  fontStyle: 'normal' | 'italic' | 'oblique';
}

export interface ILegend {
  show: boolean;
  left: number;
  top: number;
  data?: string[];
  textStyle: ITextStyle;
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
  stack?: string;
  radius?: string;
  data: Data[];
  type: string;
  name: string;
}

export type Data = number | IComplexData;

export interface IComplexData {
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
  type: string;
  controls: Controls;
  option: IChartOption;
  seriesItemTemplate: ISeriesItemTemplate;
}

export type ChartPreviewList = IChartPreview[];

export let defaultColor = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a'];

export let defaultLegend: ILegend = {
  show: true,
  left: 0,
  top: 0,
  textStyle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'normal'
  }
};

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
    type: 'pie',
    imgSrc: require('../assets/image/normalpie.png'),
    controls: {
      style: [ControlMap.Palette, ControlMap.Title, ControlMap.Legend, ControlMap.SizePosition],
      data: [ControlMap.DataEditor]
    },
    seriesItemTemplate: {
      type: 'pie',
      name: '',
      radius: '55%',
      data: [{ value: 35, name: '视频' }]
    },
    option: {
      color: defaultColor,
      title: defaultTitle,
      legend: defaultLegend,
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
    type: 'bar',
    controls: {
      style: [ControlMap.Palette, ControlMap.Title, ControlMap.Legend, ControlMap.XAxis, ControlMap.YAxis, ControlMap.SizePosition],
      data: [ControlMap.DataEditor]
    },
    imgSrc: require('../assets/image/normalbar.png'),
    seriesItemTemplate: {
      type: 'bar',
      name: '',
      data: [120, 200, 150]
    },
    option: {
      title: defaultTitle,
      color: defaultColor,
      legend: defaultLegend,
      xAxis: {
        show: true,
        name: '',
        type: 'category',
        data: ['Mon', 'Tue', 'Wed'],
        nameTextStyle: {
          color: '#333',
          fontWeight: 'normal',
          fontSize: 12,
          fontStyle: 'normal'
        },
        axisLine: {
          lineStyle: {
            color: '#333',
            type: 'solid',
            width: 1
          }
        }
      },
      yAxis: {
        show: true,
        name: '',
        type: 'value',
        nameTextStyle: {
          color: '#333',
          fontWeight: 'normal',
          fontSize: 12,
          fontStyle: 'normal'
        },
        axisLine: {
          lineStyle: {
            color: '#333',
            type: 'solid',
            width: 1
          }
        }
      },
      series: [{
        name: '图例',
        data: [120, 200, 150],
        type: 'bar'
      }
      ]
    }
  },
  {
    name: '多段柱图',
    type: 'bar',
    controls: {
      style: [ControlMap.Palette, ControlMap.Title, ControlMap.Legend, ControlMap.XAxis, ControlMap.YAxis, ControlMap.SizePosition],
      data: [ControlMap.DataEditor]
    },
    imgSrc: require('../assets/image/multibar.png'),
    seriesItemTemplate: {
      type: 'bar',
      name: '',
      data: [120, 200, 150]
    },
    option: {
      title: defaultTitle,
      color: defaultColor,
      legend: defaultLegend,
      xAxis: {
        show: true,
        name: '',
        type: 'category',
        data: ['Mon', 'Tue', 'Wed'],
        nameTextStyle: {
          color: '#333',
          fontWeight: 'normal',
          fontSize: 12,
          fontStyle: 'normal'
        },
        axisLine: {
          lineStyle: {
            color: '#333',
            type: 'solid',
            width: 1
          }
        }
      },
      yAxis: {
        show: true,
        name: '',
        type: 'value',
        nameTextStyle: {
          color: '#333',
          fontWeight: 'normal',
          fontSize: 12,
          fontStyle: 'normal'
        },
        axisLine: {
          lineStyle: {
            color: '#333',
            type: 'solid',
            width: 1
          }
        }
      },
      series: [{
        name: '图例1',
        data: [120, 200, 150],
        type: 'bar'
      },
      {
        name: '图例2',
        data: [90, 230, 60],
        type: 'bar'
      }
      ]
    }
  },
  {
    name: '堆叠柱图',
    type: 'bar',
    controls: {
      style: [ControlMap.Palette, ControlMap.Title, ControlMap.Legend, ControlMap.XAxis, ControlMap.YAxis, ControlMap.SizePosition],
      data: [ControlMap.DataEditor]
    },
    imgSrc: require('../assets/image/pilebar.png'),
    seriesItemTemplate: {
      name: '',
      type: 'bar',
      stack: 'stack',
      data: [120, 200, 150]
    },
    option: {
      title: defaultTitle,
      color: defaultColor,
      legend: defaultLegend,
      xAxis: {
        show: true,
        name: '',
        type: 'category',
        data: ['Mon', 'Tue', 'Wed'],
        nameTextStyle: {
          color: '#333',
          fontWeight: 'normal',
          fontSize: 12,
          fontStyle: 'normal'
        },
        axisLine: {
          lineStyle: {
            color: '#333',
            type: 'solid',
            width: 1
          }
        }
      },
      yAxis: {
        show: true,
        name: '',
        type: 'value',
        nameTextStyle: {
          color: '#333',
          fontWeight: 'normal',
          fontSize: 12,
          fontStyle: 'normal'
        },
        axisLine: {
          lineStyle: {
            color: '#333',
            type: 'solid',
            width: 1
          }
        }
      },
      series: [{
        name: '邮件营销',
        type: 'bar',
        stack: 'stack',
        data: [120, 132, 101]
      },
      {
        name: '联盟广告',
        type: 'bar',
        stack: 'stack',
        data: [220, 182, 191]
      },
      {
        name: '视频广告',
        type: 'bar',
        stack: 'stack',
        data: [150, 232, 201]
      }
      ]
    }
  }
];