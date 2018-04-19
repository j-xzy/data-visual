import * as React from 'react';
import { Editor } from '@base/editor';
import update from 'immutability-helper';
import { IControlProps } from '@lib/controls';
import { Data, Series, IComplexData } from '@lib/chart';

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
  seriesItemSnapShot: Series;

  handleValueChange(value: string) {
    this.value = value;
  }

  updateChart() {
    try {
      const { updateChart, chart } = this.props;
      const originSeries = chart.option.series;
      const editSeries = JSON.parse(this.value) as EditSeries;
      let newSeries: Series[] = [];

      for (let i = 0, length = editSeries.length; i < length; i++) {
        const editSeriesItem = editSeries[i];
        const originSeriesItem = originSeries[i];
        let newSeriesItem: any = {};
        let data: Data[] = [];

        if (typeof originSeriesItem !== 'undefined') {
          const editData = editSeriesItem.data;
          const originData = originSeriesItem.data;

          if (typeof originData[0] === 'number' || typeof editData[0] === 'number') {
            data = editData;
          } else {
            for (let n = 0, count = editData.length; n < count; n++) {
              const editDataItem = editData[n] as IComplexData;
              const originDataItem = originData[n] as IComplexData;

              if (typeof originDataItem !== 'undefined') {
                data.push(update(originDataItem, {
                  $merge: editDataItem
                }));
              } else {
                data.push(editDataItem);
              }
            }
          }
          newSeriesItem = update(originSeriesItem, {
            $merge: {
              name: editSeriesItem.name,
              type: this.props.type,
              data
            }
          });
        } else {
          data = editSeriesItem.data;
          newSeriesItem = update(this.seriesItemSnapShot, {
            $merge: {
              name: editSeriesItem.name,
              type: this.props.type,
              data
            }
          });
        }
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