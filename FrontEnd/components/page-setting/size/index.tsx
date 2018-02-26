import * as React from 'react';
import { InputNumber } from 'antd';

import './style.styl';

export default class PageSize extends React.Component {
  render() {
    return (
      <div className='number-container'>
        <div className='number'>
          <InputNumber min={1} />
          <div>宽度</div>
        </div>
        <div className='number'>
          <InputNumber min={1} />
          <div>高度</div>
        </div>
      </div>
    );
  }
}