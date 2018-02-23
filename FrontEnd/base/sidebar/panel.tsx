import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface PanelProps {
  title?: string;
  icon?: string;
  children?: React.ReactNode;
}

export class Panel extends React.Component<PanelProps, undefined> {
  static contextTypes = {
    collapse: PropTypes.func
  };

  render() {
    return (
      <div className='panel'>
        {this.props.title && <h1>{this.props.title}</h1>}
        <span onClick={this.context.collapse}>收缩</span>
        <div>{this.props.children}</div>
      </div>
    );
  }
}