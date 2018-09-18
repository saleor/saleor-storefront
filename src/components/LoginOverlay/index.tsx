import * as React from "react";
import ReactSVG from "react-svg";

import { Button } from "..";
import Form from "../Form";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import TextField from "../TextField";
import { UserContext } from "../User/context";

export const LoginOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlay =>
      overlay.type === OverlayType.login ? (
        <Overlay context={overlay}>
          <div className="cart">
            <div className="cart__header">
              <ReactSVG
                path="../../images/cart.svg"
                className="cart__header__cart-icon"
              />
              <p>Login</p>
              <ReactSVG
                path="../../images/x.svg"
                onClick={() => overlay.hide()}
                className="cart__header__close-icon"
              />
            </div>
            <UserContext.Consumer>
              {({ user, loading, login, logout, errors }) =>
                user ? (
                  <a onClick={logout} href="#">
                    Logout
                  </a>
                ) : (
                  <Form
                    errors={errors}
                    onSubmit={(event, data) => {
                      login(data.email, data.password);
                      event.preventDefault();
                    }}
                  >
                    <TextField
                      name="email"
                      label="email"
                      type="email"
                      required
                    />
                    <TextField
                      name="password"
                      label="password"
                      type="password"
                      required
                    />
                    <Button type="submit">
                      {loading ? "Loading" : "Login"}
                    </Button>
                  </Form>
                )
              }
            </UserContext.Consumer>
          </div>
        </Overlay>
      ) : null
    }
  </OverlayContext.Consumer>
);
