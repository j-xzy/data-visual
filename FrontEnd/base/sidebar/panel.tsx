import * as React from 'react';

export interface PanelProps {
  title?: string;
  icon?: string;
}

export class Panel extends React.Component<PanelProps, undefined> {
  render() {
    return <div>this is panel</div>;
  }
}