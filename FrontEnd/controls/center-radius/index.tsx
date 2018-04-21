import * as React from 'react';
import update from 'immutability-helper';
import Item from '@components/setting-item';
import { IControlProps } from '@controls/index';
import DoubleInput from '@components/double-input';
import { Series } from '@charts';

export default class CenterRadius extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
    this.handleCenterChange = this.handleCenterChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
  }

  getNewSeries(key: string, value: any) {
    const { series } = this.props.chart.option;
    let newSeries: Series[] = [];
    series.forEach((item) => {
      newSeries.push(update(item, {
        [key]: { $set: value }
      }));
    });
    return newSeries;
  }

  handleCenterChange(idx: 0 | 1, value: number) {
    const { chart, updateChart } = this.props;
    let center = [...chart.seriesItemTemplate.center];
    center[idx] = value + '%';
    const newSeries = this.getNewSeries('center', center);

    updateChart(update(chart, {
      seriesItemTemplate: {
        center: { $set: center }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  handleRadiusChange(idx: 0 | 1, value: number) {
    const { chart, updateChart } = this.props;
    let radius = [...chart.seriesItemTemplate.radius];
    radius[idx] = value + '%';
    const newSeries = this.getNewSeries('radius', radius);

    updateChart(update(chart, {
      seriesItemTemplate: {
        radius: { $set: radius }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  parse(center: [string, string]) {
    let newCenter: number[] = [];
    newCenter[0] = parseFloat(center[0].replace('%', ''));
    newCenter[1] = parseFloat(center[1].replace('%', ''));
    return newCenter;
  }

  render() {
    const { center, radius } = this.props.chart.seriesItemTemplate;
    const numberCenter = this.parse(center);
    const numberRadius = this.parse(radius);
    return (
      <div>
        <Item name='中心'>
          <DoubleInput type='percentage'>
            <DoubleInput.Input name='横轴' value={numberCenter[0]} onChange={(value) => this.handleCenterChange(0, value)} />
            <DoubleInput.Input name='纵轴' value={numberCenter[1]} onChange={(value) => this.handleCenterChange(1, value)} />
          </DoubleInput>
        </Item>
        <Item name='半径'>
          <DoubleInput type='percentage'>
            <DoubleInput.Input name='内半径' value={numberRadius[0]} onChange={(value) => this.handleRadiusChange(0, value)} />
            <DoubleInput.Input name='外半径' value={numberRadius[1]} onChange={(value) => this.handleRadiusChange(1, value)} />
          </DoubleInput>
        </Item>
      </div>
    );
  }
}