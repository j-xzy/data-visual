import * as React from 'react';
import update from 'immutability-helper';
import { Switch, Radio, Select, InputNumber } from 'antd';
import { IControlProps } from '@lib/controls';
import ColorInput from '@components/color-input';
import Item from '@components/setting-item';

import './style.styl';

const RadioGroup = Radio.Group;

interface IState {
  color: string;
  subColor: string;
}

export default class Title extends React.Component<IControlProps, IState> {
  constructor(props: IControlProps) {
    super(props);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleInputNumberChange = this.handleInputNumberChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      color: '',
      subColor: ''
    };
  }

  handleSwitchChange(checked: boolean) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        title: { show: { $set: checked } }
      }
    }));
  }

  handleText(e: React.ChangeEvent<HTMLInputElement>, textType: 'text' | 'subtext') {
    const value = e.target.value;
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        title: { [textType]: { $set: value } }
      }
    }));
  }

  handleColorChange(color: string, type: 'color' | 'subColor') {
    if (type === 'color') {
      this.setState({ color });
    } else {
      this.setState({ subColor: color });
    }
  }

  handleColorCompleteChange(color: string, type: 'textStyle' | 'subtextStyle') {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        title: {
          [type]: {
            color: { $set: color }
          }
        }
      }
    }));
  }

  handleInputNumberChange(value: number, textType: 'textStyle' | 'subtextStyle') {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        title: {
          [textType]: {
            fontSize: { $set: value }
          }
        }
      }
    }));
  }

  handleRadioChange(e: any) {
    const value = e.target.value;
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        title: {
          x: { $set: value }
        }
      }
    }));
  }

  handleSelectChange(value: string, type: 'textStyle' | 'subtextStyle') {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      option: {
        title: {
          [type]: {
            fontWeight: { $set: value }
          }
        }
      }
    }));
  }

  static getDerivedStateFromProps(nextProps: IControlProps) {
    const { textStyle, subtextStyle } = nextProps.chart.option.title;
    return {
      color: textStyle.color,
      subColor: subtextStyle.color
    };
  }

  shouldComponentUpdate(nextProps: IControlProps, nextState: IState) {
    return nextProps.chart.option.title !== this.props.chart.option.title
      || nextState.color !== this.state.color
      || nextState.subColor !== this.state.subColor;
  }

  render() {
    const { show, text, subtext, textStyle, subtextStyle, x } = this.props.chart.option.title;
    const { color, subColor } = this.state;
    return (
      <div className='title_control_wrapper'>
        <Item style={{ margin: '-5px 8px 0px 8px' }} name='显示'>
          <Switch checked={show} onChange={this.handleSwitchChange} />
        </Item>
        <Item name='对齐'>
          <RadioGroup value={x} onChange={this.handleRadioChange}>
            <Radio value='left' style={{ color: '#fff' }}>左</Radio>
            <Radio value='center' style={{ color: '#fff' }}>中</Radio>
            <Radio value='right' style={{ color: '#fff' }}>右</Radio>
          </RadioGroup>
        </Item>
        <Item name='标题'>
          <input className='input' value={text} onChange={(e) => this.handleText(e, 'text')} />
        </Item>
        <Item name='标题颜色'>
          <ColorInput color={color} onColorChange={(color) => this.handleColorChange(color, 'color')} onColorComplete={(color) => this.handleColorCompleteChange(color, 'textStyle')} />
        </Item>
        <Item name='标题大小'>
          <InputNumber min={1} value={textStyle.fontSize} size='small' onChange={(value: number) => this.handleInputNumberChange(value, 'textStyle')} />
          <Select size='small' defaultValue={textStyle.fontWeight} onChange={(value: string) => this.handleSelectChange(value, 'textStyle')}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='lighter' >lighter</Select.Option>
            <Select.Option value='bold' >bold</Select.Option>
          </Select>
        </Item>
        <Item name='副标题'>
          <input className='input' value={subtext} onChange={(e) => this.handleText(e, 'subtext')} />
        </Item>
        <Item name='副标颜色'>
          <ColorInput color={subColor} onColorChange={(color) => this.handleColorChange(color, 'subColor')} onColorComplete={(color) => this.handleColorCompleteChange(color, 'subtextStyle')} />
        </Item>
        <Item name='副题大小'>
          <InputNumber min={1} size='small' value={subtextStyle.fontSize} onChange={(value: number) => this.handleInputNumberChange(value, 'subtextStyle')} />
          <Select size='small' defaultValue={subtextStyle.fontWeight} onChange={(value: string) => this.handleSelectChange(value, 'subtextStyle')}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='lighter' >lighter</Select.Option>
            <Select.Option value='bold' >bold</Select.Option>
          </Select>
        </Item>
      </div>
    );
  }
}