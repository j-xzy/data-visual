import * as React from 'react';

export interface IPanelProps {
  tab: string;
  id: any;
  children?: React.ReactNode;
}

export class Panel extends React.Component<IPanelProps, undefined> {
  render() {
    const { children } = this.props;
    if (typeof children === 'undefined') {
      return null;
    }
    return children;
  }
}