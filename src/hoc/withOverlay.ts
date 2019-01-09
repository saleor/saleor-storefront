import {
  OverlayContext,
  OverlayContextInterface
} from "../components/Overlay/context";
import { createHOCFromContext } from "./helpers";

interface HOCProps {
  overlay: OverlayContextInterface;
}

const withOverlay = createHOCFromContext<HOCProps>(
  "withOverlayContext",
  "overlay",
  OverlayContext
);

export default withOverlay;
