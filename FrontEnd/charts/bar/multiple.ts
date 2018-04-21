import { ControlMap } from '@controls/index';
import { IChartPreview, ILabel } from '@charts';

const label: ILabel = {
  show: false,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal',
  rotate: 0,
  color: '#fff'
};

const MultipleBar: IChartPreview = {
  name: '多段柱图',
  type: 'bar',
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.Label, ControlMap.Legend, ControlMap.XAxis, ControlMap.YAxis, ControlMap.SizePosition],
    data: [ControlMap.DataEditor]
  },
  imgSrc: require('@assets/image/multibar.png'),
  seriesItemTemplate: {
    type: 'bar',
    name: '',
    data: [120, 200, 150],
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
      label,
      name: '图例1',
      data: [120, 200, 150],
      type: 'bar'
    },
    {
      label,
      name: '图例2',
      data: [90, 230, 60],
      type: 'bar'
    }
    ]
  }
};

export default MultipleBar;