import * as React from 'react';
import Loadable from '@hoc/loadable';
import { IUpdateStudioState } from '@pages/studio';
import { IChartConfig } from '@components/chart';

export interface IControlProps {
  updateStudioState: IUpdateStudioState;
  chart: IChartConfig;
  colors: string[];
}

export interface IControl {
  name: string;
  Component: React.ComponentClass<IControlProps>;
}

export interface IControlMap {
  readonly [p: string]: IControl;
}

export const ControlMap = {
  Palette: {
    name: '调色盘',
    Component: Loadable(() => import('@controls/palette'))
  }
};