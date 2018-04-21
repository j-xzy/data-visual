import * as React from 'react';

import './style.styl';

interface IItemProps {
  name: string;
  style?: React.CSSProperties;
  className?: string;
}

export default class Item extends React.Component<IItemProps, undefined> {
  render() {
    return (
      <div style={this.props.style} className={`setting-item ${this.props.className}`}>
        <span className='setting-item-name'>
          {this.props.name}
        </span>
        <div className='setting-item-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}