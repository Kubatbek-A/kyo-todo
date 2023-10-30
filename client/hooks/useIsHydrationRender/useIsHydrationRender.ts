import { nonNullable } from "@/helpers/nonNullable";
import useRenderNumber from "@/hooks/useRenderNumber/useRenderNumber";

let wasHydration = false;

export default function useIsHydrationRender(): boolean {
  const renderNumber = useRenderNumber();

  if (renderNumber > 0) {
    wasHydration = true;

    return false;
  }

  if (typeof window === "undefined") {
    return true;
  }

  if (wasHydration) {
    return false;
  }

  const checkerElement = nonNullable(
    document.querySelector('[data-name="is-hydration-render"]'),
    "Add component HydrationRenderChecker in the body of the document"
  );

  const isHydrationRender =
    checkerElement.getAttribute("data-content") === "true";

  if (isHydrationRender === false) {
    wasHydration = true;
  }

  return isHydrationRender;
}
