import * as React from 'react';
import Loadable from '@hoc/loadable';
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
    Component: Loadable(() => import('@controls/palette'))
  },
  DataEditor: {
    name: '数据编辑器',
    Component: Loadable(() => import('@controls/data-editor'))
  },
  Title: {
    name: '标题',
    Component: Loadable(() => import('@controls/title'))
  },
  Label: {
    name: '标签',
    Component: Loadable(() => import('@controls/label'))
  },
  SizePosition: {
    name: '尺寸位置',
    Component: Loadable(() => import('@controls/size-position'))
  },
  Legend: {
    name: '图例',
    Component: Loadable(() => import('@controls/legend'))
  },
  CenterRadius: {
    name: '中心与半径',
    Component: Loadable(() => import('@controls/center-radius'))
  },
  XAxis: {
    name: 'X轴',
    Component: Loadable(() => import('@controls/x-axis'))
  },
  YAxis: {
    name: 'Y轴',
    Component: Loadable(() => import('@controls/y-axis'))
  }
};