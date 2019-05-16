import * as braintree from "braintree-web";

interface PaymentData {
  lastDigits: string;
  ccType: string;
  token: string;
}

interface IInputs {
  ccCsc: string | null;
  ccExp: string | null;
  ccNumber: string | null;
}

export interface ErrorData {
  cvv?: string;
  expirationMonth?: string;
  expirationYear?: string;
  nonFieldError?: string;
  number?: string;
}

export interface ICreditCardState extends ErrorData {
  focusedInput: string;
  inputs: IInputs;
}

export const braintreePayment = (paymentClientToken: string, creditCard: any) =>
  new Promise<PaymentData | ErrorData[]>((resolve, reject) => {
    braintree.client.create(
      {
        authorization: paymentClientToken
      },
      (err, client) => {
        client.request(
          {
            data: { creditCard },
            endpoint: "payment_methods/credit_cards",
            method: "post"
          },
          (error, response) => {
            if (error) {
              if (error.details.originalError.fieldErrors.length > 0) {
                error.details.originalError.fieldErrors.map(error => {
                  if (error.field === "creditCard") {
                    reject(error.fieldErrors);
                  }
                });
              }
            } else {
              const lastDigits = response.creditCards[0].details.lastFour;
              const ccType = response.creditCards[0].details.cardType;
              const token = response.creditCards[0].nonce;
              resolve({ lastDigits, ccType, token });
            }
          }
        );
      }
    );
  });
