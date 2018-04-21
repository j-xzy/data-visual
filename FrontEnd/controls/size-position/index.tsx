import * as React from 'react';
import update from 'immutability-helper';
import Item from '@components/setting-item';
import DoubleInput from '@components/double-input';
import { IControlProps } from '@controls/index';

const Input = DoubleInput.Input;

export default class SizePosition extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleLeftChange = this.handleLeftChange.bind(this);
    this.handleTopChange = this.handleTopChange.bind(this);
  }

  handleWidthChange(width: number) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      size: {
        width: {
          $set: width
        }
      }
    }));
  }

  handleHeightChange(height: number) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      size: {
        height: {
          $set: height
        }
      }
    }));
  }

  handleLeftChange(left: number) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      position: {
        left: {
          $set: left
        }
      }
    }));
  }

  handleTopChange(top: number) {
    const { chart, updateChart } = this.props;
    updateChart(update(chart, {
      position: {
        top: {
          $set: top
        }
      }
    }));
  }

  round(num: number) {
    let roundNum = Math.round(num);
    if (isNaN(roundNum)) {
      return num;
    }
    return roundNum;
  }

  shouldComponentUpdate(nextProps: IControlProps) {
    return nextProps.chart.size !== this.props.chart.size || nextProps.chart.position !== this.props.chart.position;
  }

  render() {
    let { position: { left, top }, size: { width, height } } = this.props.chart;
    left = this.round(left), top = this.round(top),
      width = this.round(width), height = this.round(height);
    return (
      <div>
        <Item name='尺寸'>
          <DoubleInput>
            <Input name='宽度' min={0} value={width} onChange={this.handleWidthChange} />
            <Input name='高度' min={0} value={height} onChange={this.handleHeightChange} />
          </DoubleInput>
        </Item>
        <Item name='位置'>
          <DoubleInput>
            <Input name='横轴' value={left} onChange={this.handleLeftChange} />
            <Input name='纵轴' value={top} onChange={this.handleTopChange} />
          </DoubleInput>
        </Item>
      </div>
    );
  }
}