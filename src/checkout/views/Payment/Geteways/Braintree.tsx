import React from "react";

interface BraintreeProps {}

interface BraintreeState {}

class Braintree extends React.PureComponent {
  render() {
    return (
      <Form
        onSubmit={(event, formData) => {
          event.preventDefault();
          this.processPayment(
            createPaymentMethod,
            paymentClientToken,
            formData,
            checkout
          );
        }}
      >
        <span className="input__label">Number</span>
        <div
          className={
            this.state.errors.number ? "checkout-payment__field-error" : ""
          }
        >
          <NumberFormat
            name="ccNumber"
            autoComplete="cc-number"
            customInput={TextField}
            format="#### #### #### ####"
          />
        </div>
        {this.state.errors.number ? (
          <span className="input__error checkout-payment__error">
            {this.state.errors.number}
          </span>
        ) : (
          ""
        )}
        <div className="checkout-payment__form-grid">
          <div
            className={
              this.state.errors.cvv ? "checkout-payment__field-error" : ""
            }
          >
            <span className="input__label">CVC</span>
            <NumberFormat
              name="ccCsc"
              autoComplete="cc-csc"
              customInput={TextField}
              format="####"
            />
            {this.state.errors.cvv ? (
              <span className="input__error checkout-payment__error">
                {this.state.errors.cvv}
              </span>
            ) : (
              ""
            )}
          </div>
          <div
            className={
              this.state.errors.expirationMonth ||
              this.state.errors.expirationYear
                ? "checkout-payment__field-error"
                : ""
            }
          >
            <span className="input__label">Expiry Date</span>
            <NumberFormat
              name="ccExp"
              autoComplete="cc-exp"
              customInput={TextField}
              format="## / ##"
            />
            {this.state.errors.expirationMonth ||
            this.state.errors.expirationYear ? (
              <span className="input__error checkout-payment__error">
                {`${
                  this.state.errors.expirationMonth
                    ? `${this.state.errors.expirationMonth}. `
                    : ""
                }${this.state.errors.expirationYear}`}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button type="submit" disabled={this.state.loading}>
          {this.state.loading ? "Loading" : "Review your order"}
        </Button>
      </Form>
    );
  }
}

export default Braintree;
