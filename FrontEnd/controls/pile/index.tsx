import * as React from 'react';
import update from 'immutability-helper';
import { Switch, Select } from 'antd';
import Item from '@components/setting-item';
import { IControlProps } from '@controls/index';

interface IState {
  select: any;
}

export default class Pile extends React.Component<IControlProps, IState> {
  constructor(props: IControlProps) {
    super(props);
    this.handleSeriesChange = this.handleSeriesChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      select: 0
    };
  }

  handleSeriesChange(value: any) {
    this.setState({
      select: value
    });
  }

  handleSwitchChange(checked: boolean) {
    let stack = checked ? '默认' : null;
    const { chart, updateChart } = this.props;
    const { select } = this.state;
    updateChart(update(chart, {
      option: {
        series: {
          [select]: {
            stack: { $set: stack }
          }
        }
      }
    }));
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const stack = e.target.value;
    const { select } = this.state;
    const { updateChart, chart } = this.props;
    updateChart(update(chart, {
      option: {
        series: {
          [select]: {
            stack: { $set: stack }
          }
        }
      }
    }));
  }

  renderSeries() {
    const { series } = this.props.chart.option;
    return series.map((item, idx) => {
      return <Select.Option key={idx} value={idx} >{`系列${idx + 1}`}</Select.Option>;
    });
  }

  static getDerivedStateFromProps(nextProps: IControlProps, prevState: IState) {
    if (nextProps.chart.option.series.length <= prevState.select) {
      return { select: 0 };
    }
    return null;
  }

  shouldComponentUpdate(nextProps: IControlProps, nextState: IState) {
    return nextState.select !== this.state.select
      || nextProps.chart.option.series[this.state.select] !== this.props.chart.option.series[this.state.select];
  }

  render() {
    const { series } = this.props.chart.option;

    if (series.length === 0) {
      return <div style={{ color: '#fff', textAlign: 'center' }}>系列为空</div>;
    }

    const seriesItem = series[this.state.select];
    let stack = seriesItem.stack;

    if (typeof stack === 'undefined') {
      stack = null;
    }

    return (
      <div>
        <Item name='选择系列'>
          <Select size='small' value={this.state.select} onChange={this.handleSeriesChange}>
            {this.renderSeries()}
          </Select>
        </Item>
        <Item name='开启'>
          <Switch checked={stack !== null} onChange={this.handleSwitchChange} />
        </Item>
        {
          stack !== null &&
          <Item name='stack'>
            <input className='input' value={stack} onChange={this.handleInputChange} />
          </Item>
        }
      </div>
    );
  }
}