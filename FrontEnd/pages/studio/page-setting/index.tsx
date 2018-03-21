import * as React from 'react';
import Item from '@components/setting-item';
import { Context as StudioContext } from '@pages/studio';
import DoubleInput from '@components/double-input';

export default class PageSetting extends React.Component {
  render() {
    return (
      <StudioContext.Consumer>
        {({ changeCanvasSize, defaultCanvasSize }) => ([
          <Item name='屏幕大小' key='pageSize'>
            <DoubleInput>
              <DoubleInput.Input name='宽度' />
              <DoubleInput.Input name='长度'　/>
            </DoubleInput>
          </Item>
        ])}
      </StudioContext.Consumer>
    );
  }
}