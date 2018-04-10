import * as React from 'react';
import Editor from '@base/editor';
import { IControlProps } from '@lib/controls';

export default class DataEditor extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
  }
  render() {
    return (
      <div className='data_editor_wrapper'>
        <Editor mode='json' width='100%' height='300px' />
      </div>
    );
  }
}