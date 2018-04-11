import * as React from 'react';
import { Editor } from '@base/editor';
import update from 'immutability-helper';
import { IControlProps } from '@lib/controls';

export default class DataEditor extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  value: string;

  handleValueChange(value: string) {
    this.value = value;
  }

  updateChart() {
    try {
      const { chart, updateChart } = this.props;
      let data = JSON.parse(this.value);
      updateChart(update(chart, {
        option: {
          series: {
            0: { data: { $set: data } }
          }
        }
      }));
    } catch (err) {
      console.error('数据格式错误!');
    }
  }

  render() {
    const { chart } = this.props;
    this.value = JSON.stringify(chart.option.series[0].data, null, '\t');
    return (
      <div className='data_editor_wrapper'>
        <Editor value={this.value} onChange={this.handleValueChange} mode='json' theme='dracula' width='100%' height='600px' />
        <button onClick={this.updateChart}>更新</button>
      </div>
    );
  }
}