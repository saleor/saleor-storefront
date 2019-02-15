import classNames from "classnames";
import React from "react";

import { GatewaysEnum } from "../../../../../types/globalTypes";
import { ProviderProps } from "../View";

enum DummyPaymentChargeStatusEnum {
  CHARGED = "Charged",
  NOT_CHARGED = "Not charged",
  FULLY_REFUNDED = "Fully refunded"
}

class Dummy extends React.PureComponent<
  ProviderProps,
  { selectedStatus: { value: string; label: string } }
> {
  statuses = Object.entries(DummyPaymentChargeStatusEnum).map(
    ([value, label]) => ({ label, value })
  );
  state = { selectedStatus: this.statuses[0] };

  render() {
    const {
      loading,
      formRef,
      processPayment,
      checkout: { update }
    } = this.props;
    const { selectedStatus } = this.state;

    return (
      <form
        ref={formRef}
        onSubmit={async evt => {
          evt.preventDefault();
          await update({ dummyStatus: selectedStatus.label });
          processPayment(selectedStatus.value, GatewaysEnum.BRAINTREE);
        }}
        className="c-option__content"
      >
        {this.statuses.map(({ value, label }) => {
          const selected = selectedStatus.value === value;
          return (
            <div
              key={value}
              className={classNames("c-option", {
                "c-option--disabled": loading,
                "c-option--selected": selected
              })}
              onClick={() =>
                this.setState({ selectedStatus: { value, label } })
              }
            >
              <input type="radio" name="status" value={value} />
              <label>{label}</label>
            </div>
          );
        })}
      </form>
    );
  }
}

export default Dummy;
