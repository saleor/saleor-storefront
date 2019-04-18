import * as React from "react";
import ReactSVG from "react-svg";

import { Button } from "..";
import closeImg from "../../images/modal-close.svg";

interface IModalProps {
  title: string;
  hide: () => void;
  cancelBtnText?: string;
  submitBtnText?: string;
  loading: boolean;
  formId?: string;
}

const Modal: React.SFC<IModalProps> = ({
  cancelBtnText,
  children,
  hide,
  loading,
  formId = "modal-submit",
  submitBtnText,
  title
}) => (
  <div className="modal">
    <div className="modal__title">
      <p>{title}</p>
      <ReactSVG path={closeImg} className="modal__close" onClick={hide} />
    </div>
    <div className="modal__content">{children}</div>
    <div className="modal__footer">
      {cancelBtnText && (
        <button className="modal__cancelBtn" onClick={hide}>
          {cancelBtnText}
        </button>
      )}
      {submitBtnText && (
        <Button
          type="submit"
          form={formId}
          disabled={loading}
          className="modal__button"
        >
          {loading ? "Loading" : submitBtnText}
        </Button>
      )}
    </div>
  </div>
);

export default Modal;
