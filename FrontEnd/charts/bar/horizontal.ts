import { ControlMap } from '@controls/index';
import { IChartPreview, ILabel, ISeriesItemTemplate } from '@charts';

const label: ILabel = {
  show: false,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal',
  rotate: 0,
  color: '#fff'
};

const seriesItemTemplate: ISeriesItemTemplate = {
  type: 'bar',
  name: '',
  data: [200, 170, 240, 333, 222],
  label,
  stack: null
};

const HorizontalBar: IChartPreview = {
  name: '水平柱图',
  type: 'bar',
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.Label, ControlMap.Legend, ControlMap.XAxis, ControlMap.YAxis, ControlMap.Pile, ControlMap.SizePosition],
    data: [ControlMap.DataEditor]
  },
  imgSrc: require('@assets/image/horizontal.png'),
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
    xAxis: {
      show: true,
      name: '',
      type: 'value',
      position: 'bottom',
      data: ['周一', '周二', '周三', '周四', '周五'],
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
      type: 'category',
      position: 'left',
      data: ['周一', '周二', '周三', '周四', '周五'],
      axisTick: {
        show: false
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
    series: [{
      label,
      name: '图例',
      data: [200, 170, 240, 333, 222],
      type: 'bar',
      stack: null
    }
    ]
  }
};

export default HorizontalBar;