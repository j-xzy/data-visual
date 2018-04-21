import * as React from 'react';
import { Editor } from '@base/editor';
import update from 'immutability-helper';
import { IControlProps } from '@controls/index';
import { Data, Series } from '@charts';

interface IEditSeriesItem {
  name: string;
  data: Data[];
}

type EditSeries = IEditSeriesItem[];

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
      const { updateChart, chart } = this.props;
      const { seriesItemTemplate } = chart;
      const editSeries = JSON.parse(this.value) as EditSeries;
      let newSeries: Series[] = [];

      for (let i = 0, length = editSeries.length; i < length; i++) {
        const editSeriesItem = editSeries[i];
        let newSeriesItem: any;
        let data: ReadonlyArray<Data>;

        // merge data
        if (typeof seriesItemTemplate.data[0] === 'number') {
          data = editSeriesItem.data;
        } else {
          data = update(seriesItemTemplate.data, {
            $merge: editSeriesItem.data
          });
        }

        // merge series
        newSeriesItem = update(seriesItemTemplate, {
          $merge: {
            data,
            name: editSeriesItem.name
          }
        });

        newSeries.push(newSeriesItem);
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
    let editroSeries: EditSeries = [];
    series.forEach((item) => {
      editroSeries.push({
        name: item.name,
        data: item.data
      });
    });
    this.value = JSON.stringify(editroSeries, null, '\t');
    return (
      <div className='data_editor_wrapper'>
        <Editor value={this.value} onChange={this.handleValueChange} mode='json' theme='dracula' width='100%' height='600px' />
        <button onClick={this.updateChart}>更新</button>
      </div>
    );
  }
}