import * as React from 'react';
import PreviewContainer from '@charts/preview-container';

const preview = require('./preview.png');

export default class Preview extends React.Component {
  render() {
    return (
      <PreviewContainer imgSrc={preview} name={'基本饼图'} />
    );
  }
}