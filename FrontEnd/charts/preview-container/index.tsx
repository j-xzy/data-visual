import * as React from 'react';
import './style.styl';

interface IProps {
  imgSrc: string;
  name: string;
}

export default class PreviewContainer extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  preventDefault(e: React.DragEvent<HTMLImageElement>) {
    e.preventDefault();
  }

  render() {
    return (
      <div className='preview-container'>
        <img onDragStart={this.preventDefault} src={this.props.imgSrc} />
        <span>{this.props.name}</span>
      </div>
    );
  }
}