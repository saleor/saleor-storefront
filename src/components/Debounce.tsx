import * as React from "react";

export interface DebounceProps<TValue> {
  children: ((
    props: {
      change: (event: React.ChangeEvent<any>) => void;
      value: TValue;
    }
  ) => React.ReactElement<any>);
  debounce: (event: React.FormEvent<any>) => void;
  time?: number;
  value: TValue;
}
export interface DebounceState<TValue> {
  timer: any | null;
  value: TValue;
}

export class Debounce<TValue> extends React.Component<
  DebounceProps<TValue>,
  DebounceState<TValue>
> {
  static getDerivedStateFromProps(
    props: DebounceProps<any>,
    state: DebounceState<any>
  ) {
    if (props.value !== state.value && state.timer === null) {
      return {
        ...state,
        value: props.value
      };
    }
  }

  state: DebounceState<TValue> = {
    timer: null,
    value: this.props.value
  };

  handleChange = (event: React.ChangeEvent<any>) => {
    event.persist();
    const { timer } = this.state;
    if (timer) {
      clearTimeout(timer);
    }
    this.setState({
      timer: setTimeout(
        () => this.props.debounce(event),
        this.props.time || 200
      ),
      value: event.target.value
    });
  };

  render() {
    return this.props.children({
      change: this.handleChange,
      value: this.state.value
    });
  }
}
export default Debounce;
