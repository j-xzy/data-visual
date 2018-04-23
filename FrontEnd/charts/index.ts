import { StyleControl, DataControl } from '@controls/index';

export interface IChartOption {
  color: string[];
  series: Series[];
  title: ITitle;
  legend?: ILegend;
  xAxis?: IAxis;
  yAxis?: IAxis;
}

export type ChartType = 'bar' | 'pie' | 'scatter' | 'line';

export interface ISeriesItemTemplate extends Partial<Series> {
  data: Data[];
  type: string;
  name: string;
}

export interface IAxis {
  show?: boolean;
  name?: string;
  data?: string[];
  position?: 'left' | 'right' | 'top' | 'bottom';
  axisTick?: {
    show: boolean
  };
  type?: 'value' | 'category' | 'log';
  nameTextStyle?: INameTextStyle;
  axisLine?: {
    lineStyle: {
      color: string;
      width: number;
      type: 'solid' | 'dashed' | 'dotted';
    }
  };
}

export interface INameTextStyle extends ITextStyle {
  fontStyle: 'normal' | 'italic' | 'oblique';
}

export interface ILegend {
  show: boolean;
  left: number;
  top: number;
  data?: string[];
  textStyle: ITextStyle;
}

export interface ITitle {
  show: boolean;
  text: string;
  subtext: string;
  textStyle: ITextStyle;
  subtextStyle: ITextStyle;
  x: 'left' | 'right' | 'center';
}

export interface ITextStyle {
  color: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'lighter';
}

export interface Series {
  [p: string]: any;
  data: Data[];
  type: string;
  name: string;
  label?: ILabel;
  stack?: string;
  areaStyle?: { normal: any };
  center?: [string, string];
  radius?: [string, string];
}

export interface ILabel {
  show: boolean;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter';
  fontStyle: 'normal' | 'italic' | 'oblique';
  rotate?: number;
  color?: string;
}

export type Data = number | IComplexData | number[];

export interface IComplexData {
  value: number;
  name: string;
}

export type StyleControls = StyleControl[];

export type DataControls = DataControl[];

export interface Controls {
  style: StyleControls;
  data: DataControls;
}

export interface IChartPreview {
  name: string;
  imgSrc: string;
  type: ChartType;
  controls: Controls;
  option: IChartOption;
  seriesItemTemplate: ISeriesItemTemplate;
}

export type ChartPreviewList = IChartPreview[];

export let defaultColor = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a'];

export { pieList } from './pie';
export { barList } from './bar';
export { lineList } from './line';
export { scatterList } from './scatter';