import * as React from 'react';
import * as classNames from 'classnames';
export interface PanelProps {
  title: string;
  icon?: string;
  children?: React.ReactNode;
  collapse?: React.MouseEventHandler<HTMLElement>;
  isLeft?: boolean;
}

export class Panel extends React.Component<PanelProps, undefined> {
  render() {
    const arrowCls = classNames('arrow', {
      'arrow-right': !this.props.isLeft,
      'arrow-left': this.props.isLeft
    });
    return (
      <div className='panel'>
        <div className='head'>
          <h3 className='title'>{this.props.title}</h3>
          <span className={arrowCls} onClick={this.props.collapse}>
            <svg viewBox='0 0 1024 1024' width='15' height='15'>
              <path d='M560.713 956.031c23.955 0 43.396-19.441 43.396-43.396 0-10.773-4.346-20.33-10.86-27.937l0.425-0.425-2.235-2.235c-0.044-0.044-0.063-0.067-0.106-0.112l-358.338-358.337c-6.239-6.256-6.239-16.377 0-22.61l360.679-360.684-0.659-0.658c6.685-7.647 11.093-17.356 11.093-28.3 0-23.935-19.441-43.374-43.396-43.374-15.289 0-28.084 8.389-35.812 20.355-1.344 0.724-2.983 0.576-4.112 1.705l-410.949 410.958c-6.244 6.234-6.244 16.354 0 22.61l410.949 410.95c1.279 1.279 3.108 1.172 4.641 1.916 7.795 11.522 20.337 19.571 35.284 19.571zM872.784 956.031c23.955 0 43.394-19.441 43.394-43.396 0-10.773-4.342-20.33-10.855-27.937l0.425-0.425-2.235-2.235c-0.045-0.044-0.065-0.067-0.109-0.112l-358.339-358.337c-6.239-6.256-6.239-16.377 0-22.61l360.684-360.684-0.66-0.658c6.685-7.647 11.091-17.356 11.091-28.3 0-23.935-19.439-43.374-43.394-43.374-15.289 0-28.087 8.389-35.815 20.355-1.341 0.724-2.98 0.576-4.109 1.705l-410.951 410.958c-6.239 6.234-6.239 16.354 0 22.61l410.953 410.95c1.277 1.279 3.107 1.172 4.641 1.916 7.794 11.522 20.334 19.571 35.282 19.571z' p-id='13403' fill='#ffffff'></path>
            </svg>
          </span>
        </div>
        <div className='content'>{this.props.children}</div>
      </div>
    );
  }
}