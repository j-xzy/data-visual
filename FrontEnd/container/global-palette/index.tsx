import * as React from 'react';
import update from 'immutability-helper';
import Loadable from '@hoc/loadable';
import { IChartConfig } from '@components/chart';
import { IUpdateStudioState } from '@pages/studio';

interface IProps {
  colors: string[];
  charts: ReadonlyArray<IChartConfig>;
  updateStudioState: IUpdateStudioState;
}

const ColorInputGroup = Loadable(() => import('@components/color-input-group'));

export default class GlobalPalette extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handleColorComplete = this.handleColorComplete.bind(this);
  }

  handleColorComplete(colors: string[]) {
    const { charts } = this.props;
    let newCharts: IChartConfig[] = [];

    charts.forEach((chart) => {
      if (chart.colorFromGlobal) {
        newCharts.push(update(chart, {
          option: {
            color: { $set: colors }
          }
        }));
      } else {
        newCharts.push(chart);
      }
    });

    this.props.updateStudioState({ colors, charts: newCharts });
  }

  render() {
    return <ColorInputGroup colors={this.props.colors} onColorComplete={this.handleColorComplete} />;
  }
}