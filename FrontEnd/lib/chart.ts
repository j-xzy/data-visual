export interface IChartPreview {
  name: string;
  imgSrc: string;
  option: object;
}

export type ChartPreviewList = IChartPreview[];

export const pieList: ChartPreviewList = [
  {
    name: '普通饼图',
    imgSrc: require('../assets/image/normalpie.png'),
    option: {
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
    imgSrc: require('../assets/image/normalbar.png'),
    option: {
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