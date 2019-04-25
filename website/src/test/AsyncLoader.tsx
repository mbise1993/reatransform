import React from "react";

type AsyncLoaderProps<T> = {
  loadData: () => Promise<T>;
  children: (data: T) => React.ReactElement;
};

type AsyncLoaderState<T> = {
  data: T | null;
};

export default class AsyncLoader<T> extends React.Component<AsyncLoaderProps<T>, AsyncLoaderState<T>> {
  constructor(props: AsyncLoaderProps<T>) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.props.loadData().then(data => this.setState({ data: data }));
  }

  render() {
    return this.state.data ? this.props.children(this.state.data) : null;
  }
}
