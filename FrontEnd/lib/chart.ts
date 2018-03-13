export interface IChartPreview {
  name: string,
  imgSrc: string,
  path: string
}

export type ChartPreviewList = IChartPreview[];

export const pieList:ChartPreviewList = [
  {
    name: '普通饼图',
    imgSrc: require('../assets/image/normalpie.png'),
    path: '@charts/pie/normal'
  }
]