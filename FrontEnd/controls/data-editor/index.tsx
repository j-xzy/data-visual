import * as React from 'react';
import { Editor } from '@base/editor';
import update from 'immutability-helper';
import { IControlProps } from '@lib/controls';
import { Data, Series } from '@lib/chart';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

interface IEditData {
  name: string;
  data: Data[];
}

type EditDatas = IEditData[];

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
      const series = chart.option.series;
      let datas = JSON.parse(this.value);
      let newSeries: Series[] = [];
      for (let i = 0, length = datas.length; i < length; i++) {
        const origin = series[i];
        let data = datas[i];
        if(typeof origin !== 'undefined' ) {
          newSeries.push(update(origin, {
            $merge: data
          }));
        } else {
        }
      }
      updateChart(update(chart, {
        option: {
          series: { $set: newSeries }
        }
      }));
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { chart: { option: { series } } } = this.props;
    let datas: EditDatas = [];
    series.forEach((item) => {
      datas.push({
        name: item.name,
        data: item.data
      });
    });
    this.value = JSON.stringify(datas, null, '\t');
    return (
      <div className='data_editor_wrapper'>
        <Editor value={this.value} onChange={this.handleValueChange} mode='json' theme='dracula' width='100%' height='600px' />
        <button onClick={this.updateChart}>更新</button>
      </div>
    );
  }
}