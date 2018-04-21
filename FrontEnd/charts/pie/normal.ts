import { ControlMap } from '@controls/index';
import { IChartPreview, ILabel } from '@charts';

const label: ILabel = {
  show: true,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal'
};

const NormalPie: IChartPreview = {
  name: '普通饼图',
  type: 'pie',
  imgSrc: require('@assets/image/normalpie.png'),
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.Label, ControlMap.Legend, ControlMap.SizePosition],
    data: [ControlMap.DataEditor]
  },
  seriesItemTemplate: {
    type: 'pie',
    name: '',
    radius: [0, '55%'],
    data: [{ value: 35, name: '视频' }],
    label
  },
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
        radius: [0, '55%'],
        center: ['50%', '50%'],
        label,
        data: [
          { value: 35, name: '视频' },
          { value: 20, name: '邮件' },
          { value: 34, name: '广告' }
        ]
      }
    ]
  }
};

export default NormalPie;