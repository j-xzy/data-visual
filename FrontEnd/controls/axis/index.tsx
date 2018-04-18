import * as React from 'react';
import update from 'immutability-helper';
import Item from '@components/setting-item';
import ColorInput from '@components/color-input';
import { Switch, InputNumber, Select } from 'antd';
import { IControlProps } from '@lib/controls';

import './style.styl';

interface IProps extends IControlProps {
  axisType: 'xAxis' | 'yAxis';
}

interface IState {
  nameColor: string;
  axisColor: string;
}

export default class Axis extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleShowChange = this.handleShowChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameColorChange = this.handleNameColorChange.bind(this);
    this.handleNameColorComplete = this.handleNameColorComplete.bind(this);
    this.handleNameSizeChange = this.handleNameSizeChange.bind(this);
    this.handleNameWeightChange = this.handleNameWeightChange.bind(this);
    this.handleNameStyleChange = this.handleNameStyleChange.bind(this);
    this.handleAxisColorChange = this.handleAxisColorChange.bind(this);
    this.handleAxisColorComplete = this.handleAxisColorComplete.bind(this);
    this.handleAxisWidth = this.handleAxisWidth.bind(this);
    this.handleAxisStyleType = this.handleAxisStyleType.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);

    this.state = {
      nameColor: '',
      axisColor: ''
    };
  }

  handleShowChange(checked: boolean) {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          show: { $set: checked }
        }
      }
    }));
  }

  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          name: { $set: name }
        }
      }
    }));
  }

  handleNameColorChange(color: string) {
    this.setState({ nameColor: color });
  }

  handleNameColorComplete(color: string) {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          nameTextStyle: {
            color: { $set: color }
          }
        }
      }
    }));
  }

  handleNameSizeChange(num: number) {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          nameTextStyle: {
            fontSize: { $set: num }
          }
        }
      }
    }));
  }

  handleNameWeightChange(weight: string) {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          nameTextStyle: {
            fontWeight: { $set: weight }
          }
        }
      }
    }));
  }

  handleNameStyleChange(style: string) {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          nameTextStyle: {
            fontStyle: { $set: style }
          }
        }
      }
    }));
  }

  handleAxisColorChange(color: string) {
    this.setState({ axisColor: color });
  }

  handleAxisColorComplete(color: string) {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          axisLine: {
            lineStyle: {
              color: { $set: color }
            }
          }
        }
      }
    }));
  }

  handleAxisWidth(width: number) {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          axisLine: {
            lineStyle: {
              width: { $set: width }
            }
          }
        }
      }
    }));
  }

  handleAxisStyleType(type: 'normal' | 'dashed' | 'dotted') {
    const { chart, updateChart, axisType } = this.props;
    updateChart(update(chart, {
      option: {
        [axisType]: {
          axisLine: {
            lineStyle: {
              type: { $set: type }
            }
          }
        }
      }
    }));
  }

  handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { chart, updateChart, axisType } = this.props;
    let value = e.target.value;
    let category: string[];
    try {
      category = value.split(',');
      updateChart(update(chart, {
        option: {
          [axisType]: {
            data: { $set: category }
          }
        }
      }));
    } catch (ex) {
      console.error('类目格式输入错误');
      console.log(ex);
    }
  }

  renderCategoryData() {
    const axisType = this.props.axisType;
    const { type, data } = this.props.chart.option[axisType];
    if (type === 'category') {
      let value = data.join(',');
      return (
        <Item name='类目'>
          <input className='input' type='text' value={value} onChange={this.handleCategoryChange} />
        </Item>);
    }
    return null;
  }

  static getDerivedStateFromProps(nextProps: IProps) {
    const axisType = nextProps.axisType;
    const { nameTextStyle, axisLine: { lineStyle } } = nextProps.chart.option[axisType];
    return { nameColor: nameTextStyle.color, axisColor: lineStyle.color };
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const axisType = this.props.axisType;
    return this.props.chart.option[axisType] !== nextProps.chart.option[axisType]
      || nextState.axisColor !== this.state.axisColor
      || nextState.nameColor !== this.state.nameColor;
  }

  render() {
    const axisType = this.props.axisType;
    const { show, nameTextStyle, axisLine: { lineStyle }, name } = this.props.chart.option[axisType];
    const { nameColor, axisColor } = this.state;
    return (
      <div className='axis_wrapper'>
        <Item name='显示'>
          <Switch checked={show} onChange={this.handleShowChange} />
        </Item>
        {this.renderCategoryData()}
        <Item name='名称'>
          <input className='input' type='text' value={name} onChange={this.handleNameChange} />
        </Item>
        <Item name='名称颜色'>
          <ColorInput color={nameColor} onColorChange={this.handleNameColorChange} onColorComplete={this.handleNameColorComplete} />
        </Item>
        <Item name='名称大小'>
          <InputNumber min={1} value={nameTextStyle.fontSize} size='small' onChange={this.handleNameSizeChange} />
          <Select size='small' defaultValue={nameTextStyle.fontWeight} onChange={this.handleNameWeightChange}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='lighter' >lighter</Select.Option>
            <Select.Option value='bold' >bold</Select.Option>
          </Select>
        </Item>
        <Item name='名称样式'>
          <Select size='small' defaultValue={nameTextStyle.fontStyle} onChange={this.handleNameStyleChange}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='italic' >italic</Select.Option>
            <Select.Option value='oblique' >oblique</Select.Option>
          </Select>
        </Item>
        <Item name='轴线颜色'>
          <ColorInput color={axisColor} onColorChange={this.handleAxisColorChange} onColorComplete={this.handleAxisColorComplete} />
        </Item>
        <Item name='轴线宽度'>
          <InputNumber value={lineStyle.width} onChange={this.handleAxisWidth} />
        </Item>
        <Item name='轴线类型'>
          <Select size='small' defaultValue={lineStyle.type} onChange={this.handleAxisStyleType}>
            <Select.Option value='solid' >solid</Select.Option>
            <Select.Option value='dashed' >dashed</Select.Option>
            <Select.Option value='dotted' >dotted</Select.Option>
          </Select>
        </Item>
      </div>
    );
  }
}