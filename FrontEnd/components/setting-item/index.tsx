import * as React from 'react';

import './style.styl';

interface IItemProps {
  name: string;
}

export default class Item extends React.Component<IItemProps, undefined> {
  render() {
    return (
      <div className='setting-item'>
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