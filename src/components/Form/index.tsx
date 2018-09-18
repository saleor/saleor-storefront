import * as React from "react";

import TextField from "../TextField";

export const NON_FIELD_ERROR = "nonFieldError";

export interface FormError {
  message: string;
  field?: string;
}

interface FormProps {
  children: React.ReactNode;
  errors?: FormError[];
  data?: { [key: string]: string };
  onSubmit?(event: React.FormEvent<any>, data: { [key: string]: string });
}

interface FormState {
  data: { [key: string]: string };
  errors: FormError[];
}

function groupErrorsByFields(
  errors: FormError[]
): { [key: string]: FormError[] } {
  return errors.reduce((o, error) => {
    const key = error.field || NON_FIELD_ERROR;
    (o[key] = o[key] || []).push(error);
    return o;
  }, {});
}

function removeDuplicatedErrors(errors) {
  const keys = [];
  return errors.filter(error => {
    const key = error.message + error.field || "";
    const filter = !keys.includes(key);
    keys.push(key);
    return filter;
  });
}

class Form extends React.Component<FormProps, FormState> {
  static getDerivedStateFromProps(props, state) {
    const propsKey = (props.errors || [])
      .map(error => error.field || NON_FIELD_ERROR)
      .sort()
      .join();
    const stateKey = (state.errors || [])
      .map(error => error.field || NON_FIELD_ERROR)
      .sort()
      .join();
    if (propsKey !== stateKey) {
      const errors = removeDuplicatedErrors([
        ...(state.errors || []),
        ...(props.errors || [])
      ]);
      return {
        errors
      };
    }
    return null;
  }

  ref: React.RefObject<HTMLFormElement> = React.createRef();

  constructor(props) {
    super(props);
    const errors = props.errors || [];
    const data = props.data || {};
    this.state = {
      data,
      errors
    };
  }

  handleSubmit = event => {
    const { onSubmit } = this.props;
    if (onSubmit !== undefined) {
      onSubmit(event, this.state.data);
    }
  };

  handleInputError = event => {
    const { target: input } = event;

    this.setState(state => {
      const errors = state.errors.filter(error => error.field !== input.name);
      if (!input.validity.valid) {
        errors.push({ message: input.validationMessage, field: input.name });
      }
      return { errors };
    });
  };

  handleFieldChange = event => {
    const fieldName = event.target.name;
    const { value } = event.target;

    this.setState(state => {
      const data = { ...state.data, [fieldName]: value };
      return { data };
    });
  };

  renderWrappedChildren(children) {
    // Traverse through all children
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      // This is support for non-node elements (eg. pure text), they have no props
      if (!child.props) {
        return child;
      }

      // If current component has additional children, traverse through them as well
      if (child.props.children) {
        return React.cloneElement(child, {
          children: this.renderWrappedChildren(child.props.children)
        });
      }
      if (child.type === TextField) {
        const defaultValue = this.state.data[child.props.name];
        const groupedErrors = groupErrorsByFields(this.state.errors);
        const errors = groupedErrors[child.props.name] || [];

        return React.cloneElement(child, {
          defaultValue,
          errors,
          onBlur: event => {
            this.handleInputError(event);

            if (child.props.onBlur) {
              child.props.onBlur(event);
            }
          },
          onChange: event => {
            this.handleFieldChange(event);

            this.handleInputError(event);

            if (child.props.onChange) {
              child.props.onChange(event);
            }
          },
          onInvalid: event => {
            if (child.props.onInvalid) {
              child.props.onInvalid(event);
            }
            this.handleInputError(event);
            event.preventDefault();
          }
        });
      } else {
        return child;
      }
    });
  }

  render = () => {
    const { children, ...otherProps } = this.props;
    const { errors } = this.state;
    const nonFieldErrors = groupErrorsByFields(errors)[NON_FIELD_ERROR];
    return (
      <form {...otherProps} onSubmit={this.handleSubmit}>
        {nonFieldErrors ? (
          <span>{nonFieldErrors.map(error => error.message).join(" ")}</span>
        ) : null}
        {this.renderWrappedChildren(children)}
      </form>
    );
  };
}

export default Form;
