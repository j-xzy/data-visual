/// <reference path="index.d.ts" />

import * as React from 'react';
import * as ace from 'brace';
// import 'brace/mode/json';
import 'brace/theme/idle_fingers';

type Mode = 'abap' | 'abc' | 'actionscript' | 'json' | 'java';

interface Modes {
  [p: string]: any;
}

const modes: Modes = {
  json: () => import('brace/mode/json')
}

interface IProps {
  mode?: Mode;
  width?: string;
  height?: string;
}

export default class Editor extends React.Component<IProps, undefined> {

  el: HTMLDivElement;
  editor: ace.Editor;

  static defaultProps = {
    width: '100%',
    height: '100%'
  };

  async componentDidMount() {
    this.editor = ace.edit(this.el);
    let a = modes['d'];
    this.editor.getSession().setMode('ace/mode/json');
    this.editor.setTheme('ace/theme/idle_fingers');
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    const { width, height } = this.props;
    return <div style={{ width, height }} ref={(e) => this.el = e}></div>;
  }
}