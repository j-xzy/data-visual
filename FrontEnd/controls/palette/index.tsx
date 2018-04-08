import * as React from 'react';
import { IUpdateStudioState } from '@pages/studio';
import { IChartConfig } from '@components/chart';
import ColorInputGroup from '@components/color-input-group';
import { IControlProps } from '@lib/controls';


export default class Palette extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
    this.handleColorComplete = this.handleColorComplete.bind(this);
  }

  handleColorComplete(colors: string[]) {
    this.props.updateStudioState({ colors });
  }

  render() {
    return <ColorInputGroup colors={this.props.colors} onColorComplete={this.handleColorComplete} />;
  }
}