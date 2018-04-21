import * as React from 'react';
import update from 'immutability-helper';
import Item from '@components/setting-item';
import ColorInput from '@components/color-input';
import { Switch, InputNumber, Select } from 'antd';
import { IControlProps } from '@controls/index';
import { Series } from '@charts';

interface IState {
  color: string;
}

// each series has the same label
export default class Label extends React.Component<IControlProps, IState> {
  constructor(props: IControlProps) {
    super(props);
    this.handleShowChange = this.handleShowChange.bind(this);
    this.handleFontColorChange = this.handleFontColorChange.bind(this);
    this.handleFontColorComplete = this.handleFontColorComplete.bind(this);
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    this.handleFontWeightChange = this.handleFontWeightChange.bind(this);
    this.handleFontStyle = this.handleFontStyle.bind(this);
    this.handleRotateChange = this.handleRotateChange.bind(this);
  }

  getNewSeries(key: string, value: any) {
    const { series } = this.props.chart.option;
    let newSeries: Series[] = [];
    series.forEach((item) => {
      newSeries.push(update(item, {
        label: {
          [key]: { $set: value }
        }
      }));
    });
    return newSeries;
  }

  handleShowChange(checked: boolean) {
    const { updateChart, chart } = this.props;
    const series = chart.option.series;
    let newSeries = this.getNewSeries('show', checked);

    updateChart(update(chart, {
      seriesItemTemplate: {
        label: {
          show: { $set: checked }
        }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  handleFontColorChange(color: string) {
    this.setState({ color });
  }

  handleFontColorComplete(color: string) {
    const { updateChart, chart } = this.props;
    const series = chart.option.series;
    let newSeries = this.getNewSeries('color', color);

    updateChart(update(chart, {
      seriesItemTemplate: {
        label: {
          color: { $set: color }
        }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  handleFontSizeChange(fontSize: number) {
    const { updateChart, chart } = this.props;
    const series = chart.option.series;
    let newSeries = this.getNewSeries('fontSize', fontSize);
    updateChart(update(chart, {
      seriesItemTemplate: {
        label: {
          fontSize: { $set: fontSize }
        }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  handleFontWeightChange(fontWeight: 'normal' | 'lighter' | 'bold') {
    const { updateChart, chart } = this.props;
    const series = chart.option.series;
    let newSeries = this.getNewSeries('fontWeight', fontWeight);
    updateChart(update(chart, {
      seriesItemTemplate: {
        label: {
          fontWeight: { $set: fontWeight }
        }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  handleFontStyle(fontStyle: 'normal' | 'italic' | 'oblique') {
    const { updateChart, chart } = this.props;
    const series = chart.option.series;
    let newSeries = this.getNewSeries('fontStyle', fontStyle);
    updateChart(update(chart, {
      seriesItemTemplate: {
        label: {
          fontStyle: { $set: fontStyle }
        }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  handleRotateChange(rotate: number) {
    const { updateChart, chart } = this.props;
    const series = chart.option.series;
    let newSeries = this.getNewSeries('rotate', rotate);
    updateChart(update(chart, {
      seriesItemTemplate: {
        label: {
          rotate: { $set: rotate }
        }
      },
      option: {
        series: { $set: newSeries }
      }
    }));
  }

  static getDerivedStateFromProps(nextProps: IControlProps) {
    const { color } = nextProps.chart.seriesItemTemplate.label;
    return { color };
  }

  render() {
    const { label: { show, fontSize, fontWeight, fontStyle, rotate } } = this.props.chart.seriesItemTemplate;
    const type = this.props.chart.type;
    return (
      <div>
        <Item name='显示'>
          <Switch checked={show} onChange={this.handleShowChange} />
        </Item>
        {type === 'bar' &&
          <Item name='字体颜色'>
            <ColorInput color={this.state.color} onColorChange={this.handleFontColorChange} onColorComplete={this.handleFontColorComplete} />
          </Item>
        }
        <Item className='fontsize' name='字体大小'>
          <InputNumber value={fontSize} size='small' onChange={this.handleFontSizeChange} />
          <Select size='small' defaultValue={fontWeight} onChange={this.handleFontWeightChange}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='lighter' >lighter</Select.Option>
            <Select.Option value='bold' >bold</Select.Option>
          </Select>
        </Item>
        <Item name='字体样式'>
          <Select size='small' defaultValue={fontStyle} onChange={this.handleFontStyle}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='italic' >italic</Select.Option>
            <Select.Option value='oblique' >oblique</Select.Option>
          </Select>
        </Item>
        {type === 'bar' &&
          <Item name='旋转角度'>
            <InputNumber size='small' value={rotate} onChange={this.handleRotateChange} />
          </Item>
        }
      </div>
    );
  }
}