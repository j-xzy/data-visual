import { ControlMap } from '@controls/index';
import { IChartPreview, ILabel, ISeriesItemTemplate } from '@charts';

const label: ILabel = {
  show: true,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal'
};

const seriesItemTemplate: ISeriesItemTemplate = {
  type: 'line',
  name: '',
  data: [320, 532, 601, 934, 1290, 1330, 1320],
  label
};

const NormalLine: IChartPreview = {
  name: '普通折线图',
  type: 'line',
  imgSrc: require('@assets/image/normalline.png'),
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.Label, ControlMap.XAxis, ControlMap.YAxis, ControlMap.Pile, ControlMap.SizePosition],
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
    xAxis: {
      show: true,
      name: '',
      type: 'category',
      position: 'bottom',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        show: true
      },
      nameTextStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 12,
        fontStyle: 'normal'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.6)',
          type: 'solid',
          width: 1
        }
      }
    },
    yAxis: {
      show: true,
      name: '',
      type: 'value',
      position: 'left',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        show: true
      },
      nameTextStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 12,
        fontStyle: 'normal'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.6)',
          type: 'solid',
          width: 1
        }
      }
    },
    series: [
      {
        name: '',
        type: 'line',
        label,
        data: [320, 532, 601, 934, 1290, 1330, 1320]
      }
    ]
  }
};

export default NormalLine;