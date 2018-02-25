import * as React from 'react';
import Leftbar from '@components/leftbar';
import Setting from '@components/setting';
import Canvas from '@components/canvas';

import './style.styl';

export default class Studio extends React.Component {
  render() {
    return (
      <div className='studio'>
        <div className='leftbar_container'>
          <Leftbar />
        </div>
        <div className='st_content'>
          <Canvas />
        </div>
        <div className='setting_container'>
          <Setting />
        </div>
      </div>
    );
  }
}