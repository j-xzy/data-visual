import { ControlMap } from '@controls/index';
import { IChartPreview, ILabel, ISeriesItemTemplate } from '@charts';

const label: ILabel = {
  show: true,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal'
};

const seriesItemTemplate: ISeriesItemTemplate = {
  type: 'pie',
  name: '',
  radius: ['12%', '70%'],
  center: ['50%', '50%'],
  roseType: 'radius',
  data: [{ value: 35, name: '视频' }],
  label
};

const RosePie: IChartPreview = {
  name: '玫瑰图',
  type: 'pie',
  imgSrc: require('@assets/image/rosepie.png'),
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.Label, ControlMap.Legend, ControlMap.CenterRadius, ControlMap.SizePosition],
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
    color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a'],
    legend: {
      show: true,
      left: 0,
      top: 0,
      textStyle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'normal'
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['12%', '70%'],
        center: ['50%', '50%'],
        label,
        roseType: 'radius',
        data: [
          {
            value: 20,
            name: '视频'
          },
          {
            value: 30,
            name: '邮件'
          },
          {
            value: 40,
            name: '音频'
          },
          {
            value: 50,
            name: '广告'
          },
          {
            value: 60,
            name: '音乐'
          }
        ]
      }
    ]
  }
};

export default RosePie;