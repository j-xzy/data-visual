import * as React from 'react';
import update from 'immutability-helper';
import Item from '@components/setting-item';
import DoubleInput from '@components/double-input';
import ColorInput from '@components/color-input';
import { Switch, Select, InputNumber } from 'antd';
import { IControlProps } from '@controls/index';
import { IComplexData } from '@charts';

interface IState {
  color: string;
}

export default class Legend extends React.Component<IControlProps, IState> {
  constructor(props: IControlProps) {
    super(props);
    this.handlePositionInputChange = this.handlePositionInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleColorComplete = this.handleColorComplete.bind(this);
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    this.handleFontWeightChange = this.handleFontWeightChange.bind(this);
    this.renderDataOption = this.renderDataOption.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      color: ''
    };
  }

  handlePositionInputChange(type: 'top' | 'left', value: number) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        legend: {
          [type]: { $set: value }
        }
      }
    }));
  }

  handleColorChange(color: string) {
    this.setState({ color });
  }

  handleColorComplete(color: string) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        legend: {
          textStyle: {
            color: { $set: color }
          }
        }
      }
    }));
  }

  handleSwitchChange(checked: boolean) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        legend: {
          show: { $set: checked }
        }
      }
    }));
  }

  handleFontSizeChange(value: number) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        legend: {
          textStyle: {
            fontSize: { $set: value }
          }
        }
      }
    }));
  }

  handleFontWeightChange(value: string) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        legend: {
          textStyle: {
            fontWeight: { $set: value }
          }
        }
      }
    }));
  }

  handleSelectChange(value: string[]) {
    const { updateChart, chart } = this.props;

    updateChart(update(chart, {
      option: {
        legend: {
          data: { $set: [...value] }
        }
      }
    }));
  }

  renderDataOption() {
    const { series } = this.props.chart.option;
    let data: string[] = [];
    series.forEach((item) => {
      let name = item.name;
      if (name !== '') {
        data.push(name);
      }
      item.data.forEach((secondItem) => {
        if (typeof secondItem !== 'number') {
          data.push((secondItem as IComplexData).name);
        }
      });
    });
    return data.map((name, idx) => {
      return <Select.Option value={name} key={name + idx}>{name}</Select.Option>;
    });
  }

  static getDerivedStateFromProps(nextProps: IControlProps) {
    const { legend: { textStyle: { color }, data } } = nextProps.chart.option;
    let legendData: string[] = [];
    if (typeof data !== 'undefined') {
      legendData = data;
    }
    return { color, data: legendData };
  }

  shouldComponentUpdate(nextProps: IControlProps, nextState: IState) {
    return nextProps.chart.option.legend !== this.props.chart.option.legend
      || nextState.color !== this.state.color;
  }

  render() {
    const { show, left, top, textStyle, data } = this.props.chart.option.legend;
    const { fontSize, fontWeight } = textStyle;
    return (
      <div className='legend_wrapper'>
        <Item name='显示'>
          <Switch checked={show} onChange={this.handleSwitchChange} />
        </Item>
        <Item name='图标'>
          <Select value={data} onChange={this.handleSelectChange} style={{ width: '100%' }} mode='multiple' size='small'>
            {this.renderDataOption()}
          </Select>
        </Item>
        <Item name='位置'>
          <DoubleInput>
            <DoubleInput.Input name='横轴' value={left} onChange={(value) => this.handlePositionInputChange('left', value)} />
            <DoubleInput.Input name='纵轴' value={top} onChange={(value) => this.handlePositionInputChange('top', value)} />
          </DoubleInput>
        </Item>
        <Item name='字体颜色'>
          <ColorInput color={this.state.color} onColorChange={this.handleColorChange} onColorComplete={this.handleColorComplete} />
        </Item>
        <Item className='fontsize' name='字体大小'>
          <InputNumber value={fontSize} size='small' onChange={this.handleFontSizeChange} />
          <Select size='small' defaultValue={fontWeight} onChange={this.handleFontWeightChange}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='lighter' >lighter</Select.Option>
            <Select.Option value='bold' >bold</Select.Option>
          </Select>
        </Item>
      </div>
    );
  }
}