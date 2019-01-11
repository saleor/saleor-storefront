import * as React from "react";

export interface DebounceChangeProps<TValue> {
  children: ((
    props: {
      change: (event: React.ChangeEvent<any>) => void;
      value: TValue;
    }
  ) => React.ReactElement<any>);
  debounce: (event: React.ChangeEvent<any>) => void;
  time?: number;
  value: TValue;
}
export interface DebounceChangeState<TValue> {
  timer: any | null;
  value: TValue;
}

export class DebounceChange<TValue> extends React.Component<
  DebounceChangeProps<TValue>,
  DebounceChangeState<TValue>
> {
  static getDerivedStateFromProps(
    props: DebounceChangeProps<any>,
    state: DebounceChangeState<any>
  ) {
    if (props.value !== state.value && state.timer === null) {
      return { ...state, value: props.value };
    }
    return state;
  }

  state: DebounceChangeState<TValue> = { timer: null, value: this.props.value };

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
export default DebounceChange;
