import * as React from 'react';
import ColorInputGroup from '@components/color-input-group';
import { IUpdateStudioState } from '@pages/studio';

interface IProps {
  colors: string[];
  updateStudioState: IUpdateStudioState;
}

export default class GlobalColorInputGroup extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
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