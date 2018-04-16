import * as React from 'react';
import DoubleInput from '@components/double-input';
import { CanvasSizeType, IUpdateStudioState } from '@pages/studio';

const Input = DoubleInput.Input;

interface IProps {
  canvasSize: CanvasSizeType;
  updateStudioState: IUpdateStudioState;
}

export default class CanvasSize extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }

  shouldComponentUpdate(nextProps: IProps) {
    const { canvasSize: { width, height } } = nextProps;
    const { canvasSize: { width: lastWidth, height: lastHeight } } = this.props;
    return width !== lastWidth || height !== lastHeight;
  }

  handleWidthChange(width: number) {
    this.props.updateStudioState({
      canvasSize: {
        width,
        height: this.props.canvasSize.height
      }
    });
  }

  handleHeightChange(height: number) {
    this.props.updateStudioState({
      canvasSize: {
        width: this.props.canvasSize.width,
        height
      }
    });
  }

  render() {
    const { canvasSize: { width, height } } = this.props;
    return (
      <DoubleInput>
        <Input name='宽度' value={width} onChange={(value) => this.handleWidthChange(value)} />
        <Input name='高度' value={height} onChange={(value) => this.handleHeightChange(value)} />
      </DoubleInput>
    );
  }
}