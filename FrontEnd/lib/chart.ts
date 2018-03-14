import NormalPie from '@charts/pie/normal';
export interface IChartPreview {
  name: string;
  imgSrc: string;
  getChartAsync: () => Promise<any>
}

export type ChartPreviewList = IChartPreview[];

export const pieList: ChartPreviewList = [
  {
    name: '普通饼图',
    imgSrc: require('../assets/image/normalpie.png'),
    getChartAsync: () => import('@charts/pie/normal')
  }
];

export const barList: ChartPreviewList = [
  {
    name: '普通柱状图',
    imgSrc: require('../assets/image/normalbar.png'),
    getChartAsync: () => import('@charts/bar/normal')
  }
];