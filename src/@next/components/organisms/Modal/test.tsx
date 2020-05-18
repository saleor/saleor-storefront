import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Overlay } from "@components/organisms";

import { Modal } from ".";
import * as S from "./styles";
import { IProps } from "./types";

const Children = () => <div>Content</div>;
const DEFAULT_PROPS = {
  cancelBtnText: "Cancel",
  children: Children,
  disabled: false,
  formId: "form-id",
  hide: jest.fn(),
  onSubmit: jest.fn(),
  show: true,
  submitBtnText: "Save",
  submitButtonDataCy: "submitTestModalButton",
  title: "Modal title",
};

describe("<Modal />", () => {
  const renderModal = (props: IProps) =>
    shallow(
      <Modal {...props}>
        <Children />
      </Modal>
    );
  it("exists", () => {
    const modal = renderModal(DEFAULT_PROPS);

    expect(modal.exists()).toEqual(true);
  });

  it("should render <Overlay /> component with [position, show, hide, target] props", () => {
    const overlay = renderModal({ ...DEFAULT_PROPS, target: null }).find(
      Overlay
    );
    const overlayProps = overlay.props();

    expect(overlay.exists()).toEqual(true);
    expect(overlayProps.position).toEqual("center");
    expect(overlayProps.show).toEqual(DEFAULT_PROPS.show);
    expect(overlayProps.hide).toEqual(DEFAULT_PROPS.hide);
    expect(overlayProps.target).toBeDefined();
  });

  it("should render <CardHeader /> with title", () => {
    const header = renderModal(DEFAULT_PROPS).find("CardHeader");

    expect(header.exists()).toEqual(true);
    expect(header.contains(DEFAULT_PROPS.title)).toBe(true);
    expect(header.prop("divider")).toEqual(true);
    expect(header.prop("onHide")).toEqual(DEFAULT_PROPS.hide);
  });

  it("should render children wrapped in <S.Content/>", () => {
    const content = renderModal(DEFAULT_PROPS).find(S.Content);

    expect(content.exists()).toEqual(true);
    expect(content.contains(<Children />)).toBe(true);
  });

  it("should render <FormFooter />", () => {
    const footer = renderModal(DEFAULT_PROPS).find("FormFooter");

    expect(footer.exists()).toEqual(true);
    expect(footer.prop("divider")).toEqual(true);
    expect(footer.prop("disabled")).toEqual(DEFAULT_PROPS.disabled);
    expect(footer.prop("submitBtn")).toEqual({
      action: DEFAULT_PROPS.onSubmit,
      dataCy: "submitTestModalButton",
      text: DEFAULT_PROPS.submitBtnText,
    });
    expect(footer.prop("cancelBtn")).toEqual({
      action: DEFAULT_PROPS.hide,
      dataCy: "cancelButton",
      text: DEFAULT_PROPS.cancelBtnText,
    });
    expect(footer.prop("formId")).toEqual(DEFAULT_PROPS.formId);
  });
});
