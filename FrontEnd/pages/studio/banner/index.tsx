import * as React from 'react';
import { Charts, CanvasSizeType } from '@pages/studio/index';

import './style.styl';

interface IBannerProps {
  charts: Charts;
  canvasSize: CanvasSizeType;
}

interface IBannerItemProps {
  name: string;
  icon: string;
  onClick: () => void;
}

export default class Banner extends React.Component<IBannerProps, undefined> {
  constructor(props: IBannerProps) {
    super(props);
    this.handlePreviewClick = this.handlePreviewClick.bind(this);
  }

  handlePreviewClick() {
    const { canvasSize, charts } = this.props;
    const previeWindow: any = window.open('preview/index.html');
    previeWindow.onload = () => {
      previeWindow.init(charts, canvasSize);
    };
  }

  render() {
    return (
      <div className='banner'>
        <span className='banner_head'>Data-Visual</span>
        <div className='banner_right'>
          <BannerIcon name='预览' icon='icon-preview' onClick={this.handlePreviewClick} />
          <BannerIcon name='发布' icon='icon-publish' onClick={() => { }} />
        </div>
      </div>
    );
  }
}

function BannerIcon(props: IBannerItemProps) {
  return (
    <div onClick={props.onClick} className='banner_item'>
      <p className='banner_icon'>
        <i className={props.icon}></i>
      </p>
      <p className='banner_text'>{props.name}</p>
    </div>
  );
}