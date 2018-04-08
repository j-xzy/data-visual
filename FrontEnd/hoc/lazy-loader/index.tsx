import * as React from 'react';

type Loader<Props> = () => Promise<{ default: React.ComponentType<Props> }>;

type Loading = React.ComponentType | (() => null);

interface IState<Props> {
  Component: React.ComponentType<Props>;
}

export default function LazyLoader<Props>(loader: Loader<Props>, Loading: Loading) {
  return class extends React.Component<Props, IState<Props>> {
    constructor(props: Props) {
      super(props);
      this.state = {
        Component: null
      };
    }

    async componentWillMount() {
      let esModule = await loader();
      this.setState({ Component: esModule.default });
    }

    render() {
      let { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return <Loading />;
    }
  };
}