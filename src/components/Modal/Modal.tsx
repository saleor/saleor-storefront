import "./scss/index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactSVG from "react-svg";

import { FormFooter } from "@components/molecules";
import closeImg from "../../images/modal-close.svg";

interface IModalProps {
  target?: HTMLElement | null;
  title: string;
  hide: () => void;
  cancelBtnText?: string;
  submitBtnText?: string;
  loading: boolean;
  formId?: string;
  show: boolean;
}
const modalRoot = document.getElementById("modal-root");

const Modal: React.FC<IModalProps> = ({
  cancelBtnText,
  children,
  hide,
  loading,
  formId = "modal-submit",
  submitBtnText,
  target = modalRoot,
  show,
  title,
}) =>
  target && show
    ? ReactDOM.createPortal(
        <div className="overlay overlay--modal">
          <div className="overlay__modal">
            <div className="modal">
              <div className="modal__title">
                <p>{title}</p>
                <ReactSVG
                  path={closeImg}
                  className="modal__close"
                  onClick={hide}
                />
              </div>
              <div className="modal__content">{children}</div>
              <FormFooter
                cancelBtn={{ action: hide, text: cancelBtnText }}
                submitBtn={{ text: loading ? "Loading" : submitBtnText }}
                formId={formId}
              />
            </div>
          </div>
        </div>,
        target
      )
    : null;

export default Modal;
