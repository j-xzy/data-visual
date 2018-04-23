import { ControlMap } from '@controls/index';
import { IChartPreview, ILabel, ISeriesItemTemplate } from '@charts';

const label: ILabel = {
  show: false,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal'
};

const seriesItemTemplate: ISeriesItemTemplate = {
  type: 'line',
  name: '',
  data: [320, 532, 601, 934, 1290, 1330, 1320],
  label,
  areaStyle: { normal: {} },
  stack: '总量'
};

const PileLine: IChartPreview = {
  name: '堆叠折线图',
  type: 'line',
  imgSrc: require('@assets/image/pileline.png'),
  controls: {
    style: [ControlMap.Palette, ControlMap.Title, ControlMap.Label, ControlMap.Legend, ControlMap.XAxis, ControlMap.YAxis, ControlMap.Pile, ControlMap.SizePosition],
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
      show: false,
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
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        label,
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        label,
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        label,
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        label,
        areaStyle: { normal: {} },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        label,
        areaStyle: { normal: {} },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }
};

export default PileLine;