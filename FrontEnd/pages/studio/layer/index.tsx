import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './style.styl';

class RawLayer extends React.Component {
  render() {
    return (
      <div className='layer_container'>
      </div>
    );
  }
}

export const Layer = DragDropContext(HTML5Backend)(RawLayer);