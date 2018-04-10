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
  defaultValue?: string;
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
    defaultValue: ''
  };

  handleChange(e: any) {
    this.props.onChange(this.editor.getValue());
  }

  async componentDidMount() {
    const { mode, theme, defaultValue } = this.props;
    await this.setEditor(mode, theme);
    this.editor.on('change', this.handleChange);
    this.editor.setValue(defaultValue);
  }

  async setEditor(mode: Mode, theme: Theme) {
    await modes[mode]();
    await themes[theme]();
    this.editor = ace.edit(this.el);
    this.editor.getSession().setMode(`ace/mode/${mode}`);
    this.editor.setTheme(`ace/theme/${theme}`);
  }

  componentDidUpdate() {
    const { mode, theme, defaultValue } = this.props;
    this.setEditor(mode, theme);
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    const { width, height } = this.props;
    return <div style={{ width, height }} ref={(e) => this.el = e}></div>;
  }
}