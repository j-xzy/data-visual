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
  name: '',
  type: 'bar',
  stack: 'stack',
  data: [120, 200, 150],
  label
};

const PileBar: IChartPreview = {
  name: '堆叠柱图',
  type: 'bar',
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.Label, ControlMap.Legend, ControlMap.XAxis, ControlMap.YAxis, ControlMap.Pile, ControlMap.SizePosition],
    data: [ControlMap.DataEditor]
  },
  imgSrc: require('@assets/image/pilebar.png'),
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
      type: 'category',
      data: ['Mon', 'Tue', 'Wed'],
      axisTick: {
        show: true
      },
      position: 'bottom',
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
      data: ['Mon', 'Tue', 'Wed'],
      axisTick: {
        show: true
      },
      position: 'left',
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
      name: '邮件营销',
      type: 'bar',
      stack: 'stack',
      label,
      data: [120, 132, 101]
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: 'stack',
      label,
      data: [220, 182, 191]
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: 'stack',
      label,
      data: [150, 232, 201]
    }
    ]
  }
};

export default PileBar;