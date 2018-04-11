/// <reference path="./index.d.ts"/>
import * as React from 'react';
import * as ace from 'brace';
import { Mode, Theme } from './type';
import { modes } from './modes';
import { themes } from './themes';

export type Mode = Mode;
export type Theme = Theme;

interface IProps {
  mode: Mode;
  theme: Theme;
  value?: string;
  onChange?: (text: string) => void;
  width?: string;
  height?: string;
}

export class Editor extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  el: HTMLDivElement;
  editor: ace.Editor;

  static defaultProps = {
    width: '100%',
    height: '100%',
    value: ''
  };

  handleChange(e: any) {
    this.props.onChange(this.editor.getValue());
  }

  async componentDidMount() {
    const { mode, theme, value } = this.props;
    await this.setEditor(mode, theme);
    this.editor.$blockScrolling = Infinity;
    this.editor.on('change', this.handleChange);
    this.editor.setValue(value);
  }

  async setEditor(mode: Mode, theme: Theme) {
    await modes[mode]();
    await themes[theme]();
    this.editor = ace.edit(this.el);
    this.editor.getSession().setMode(`ace/mode/${mode}`);
    this.editor.setTheme(`ace/theme/${theme}`);
  }

  async componentDidUpdate(prevProps: IProps) {
    const { mode, theme, value } = this.props;
    if (mode !== prevProps.mode || theme !== prevProps.theme) {
      await this.setEditor(mode, theme);
    }
    this.editor.setValue(value);
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    const { width, height } = this.props;
    return <div style={{ width, height }} ref={(e) => this.el = e}></div>;
  }
}