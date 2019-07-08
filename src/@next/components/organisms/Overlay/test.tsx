import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { Transition } from "react-transition-group";

import { Overlay } from ".";
import * as S from "./styles";
import { IProps, Position, TransitionState } from "./types";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

describe("<Overlay />", () => {
  const DEFAULT_STATE = "exited";
  const Children = () => <div>"Some content"</div>;
  const position: Position = "center";

  const DEFAULT_PROPS = {
    children: Children,
    hide: jest.fn(),
    position,
    show: true,
    target: portalRoot,
  };

  const renderOverlay = (props: IProps) =>
    shallow(
      <Overlay {...props}>
        <Children />
      </Overlay>
    );
  const renderOverlayContent = (
    props: IProps,
    state: TransitionState = DEFAULT_STATE
  ) =>
    renderOverlay(props)
      .find(Transition)
      .renderProp("children")(state);

  it("exists", () => {
    const overlay = renderOverlay(DEFAULT_PROPS);

    expect(overlay.exists()).toEqual(true);
  });

  it("should not be rendered if `target` prop is set to null", () => {
    const overlay = renderOverlay({
      ...DEFAULT_PROPS,
      target: null,
    }).find(Transition);

    expect(overlay.exists()).toEqual(false);
  });

  it("should render <Transition /> component with `in` prop equal to `show` and `timeout` equal to `duration`", () => {
    const DURATION = 1200;
    const transition = renderOverlay({
      ...DEFAULT_PROPS,
      duration: DURATION,
    }).find(Transition);

    expect(transition.exists()).toBe(true);
    expect(transition.prop("in")).toEqual(DEFAULT_PROPS.show);
    expect(transition.prop("timeout")).toEqual(DURATION);
  });

  it("should render <S.Overlay> with [open, position, state, onClick] props", () => {
    const SHOW = true;
    const STATE = "entered";
    const overlayProps = renderOverlayContent(
      { ...DEFAULT_PROPS, show: SHOW },
      STATE
    )
      .find(S.Overlay)
      .props();

    expect(overlayProps.open).toEqual(SHOW);
    expect(overlayProps.position).toEqual(DEFAULT_PROPS.position);
    expect(overlayProps.onClick).toEqual(DEFAULT_PROPS.hide);
    expect(overlayProps.state).toEqual(STATE);
  });

  it("should render <S.Lightbox> with [open, position, state, onClick] props", () => {
    const SHOW = true;
    const STATE = "entered";
    const lightboxProps = renderOverlayContent(
      { ...DEFAULT_PROPS, show: SHOW },
      STATE
    )
      .find(S.Lightbox)
      .props();

    expect(lightboxProps.open).toEqual(SHOW);
    expect(lightboxProps.position).toEqual(DEFAULT_PROPS.position);
    expect(lightboxProps.state).toEqual(STATE);
    expect(lightboxProps.onClick).toBeDefined();
  });

  it("should render children", () => {
    const overlay = renderOverlayContent({ ...DEFAULT_PROPS });

    expect(overlay.find(Children).exists()).toBe(true);
  });
});
