import { ControlMap } from '@controls/index';
import { IChartPreview, ILabel, ISeriesItemTemplate } from '@charts';

const label: ILabel = {
  show: true,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal'
};

const seriesItemTemplate: ISeriesItemTemplate = {
  type: 'scatter',
  name: '',
  symbolSize: 20,
  data: [[10.0, 8.04]]
};

const NormalScatter: IChartPreview = {
  name: '普通散点图',
  type: 'scatter',
  imgSrc: require('@assets/image/normalscatter.png'),
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.SizePosition],
    data: [ControlMap.DataEditor]
  },
  seriesItemTemplate,
  option: {
    title: {
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
    },
    xAxis: {
    },
    yAxis: {

    },
    color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a'],
    series: [
      {
        symbolSize: 20,
        name: '',
        type: 'scatter',
        data: [
          [10.0, 8.04],
          [8.0, 6.95],
          [13.0, 7.58],
          [9.0, 8.81],
          [11.0, 8.33],
          [14.0, 9.96],
          [6.0, 7.24],
          [4.0, 4.26],
          [12.0, 10.84],
          [7.0, 4.82],
          [5.0, 5.68]
        ]
      }
    ]
  }
};

export default NormalScatter;