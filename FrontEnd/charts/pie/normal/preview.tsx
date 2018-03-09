import * as React from 'react';
import PreviewContainer from '@charts/preview';
import { name } from './index';

const preview = require('./preview.png');

export default class Preview extends React.Component {
  render() {
    return (
      <PreviewContainer imgSrc={preview} name={name} />
    );
  }
}