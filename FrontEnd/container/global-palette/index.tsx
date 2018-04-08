import * as React from 'react';
import Loadable from '@hoc/loadable';
import { IUpdateStudioState } from '@pages/studio';

interface IProps {
  colors: string[];
  updateStudioState: IUpdateStudioState;
}

const ColorInputGroup = Loadable(() => import('@components/color-input-group'));

export default class GlobalPalette extends React.Component<IProps, undefined> {
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