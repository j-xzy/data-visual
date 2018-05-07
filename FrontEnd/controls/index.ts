import * as React from 'react';
import Loadable from '@hoc/loadable';
import { Spin } from 'antd';
import { IChartConfig } from '@components/chart';

export interface IUpdateChart {
  (chartConfig: IChartConfig, callback?: () => void): void;
}

export interface IControlProps {
  updateChart: IUpdateChart;
  chart: IChartConfig;
  name: string;
  type: string;
  colors: string[];
}

export interface StyleControl {
  name: string;
  Component: React.ComponentClass<IControlProps>;
}

export interface DataControl {
  name: string;
  Component: React.ComponentClass<IControlProps>;
}

export const ControlMap = {
  Palette: {
    name: '调色盘',
    Component: Loadable(() => import('@controls/palette'), Spin)
  },
  DataEditor: {
    name: '数据编辑器',
    Component: Loadable(() => import('@controls/data-editor'), Spin)
  },
  Title: {
    name: '标题',
    Component: Loadable(() => import('@controls/title'), Spin)
  },
  Label: {
    name: '标签',
    Component: Loadable(() => import('@controls/label'), Spin)
  },
  SizePosition: {
    name: '尺寸位置',
    Component: Loadable(() => import('@controls/size-position'), Spin)
  },
  Legend: {
    name: '图例',
    Component: Loadable(() => import('@controls/legend'), Spin)
  },
  CenterRadius: {
    name: '中心与半径',
    Component: Loadable(() => import('@controls/center-radius'), Spin)
  },
  XAxis: {
    name: 'X轴',
    Component: Loadable(() => import('@controls/x-axis'), Spin)
  },
  YAxis: {
    name: 'Y轴',
    Component: Loadable(() => import('@controls/y-axis'), Spin)
  },
  Pile: {
    name: '堆叠',
    Component: Loadable(() => import('@controls/pile'), Spin)
  }
};