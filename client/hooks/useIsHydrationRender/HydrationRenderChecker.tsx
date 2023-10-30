import { nonNullable } from "@/helpers/nonNullable";
import useSSRLayoutEffect from "../useSSRLayoutEffect/useSSRLayoutEffect";

let isHydrationRender = true;

/**
 * Place the component in the body of the document in any placy
 */
export default function HydrationRenderChecker() {
  useSSRLayoutEffect(() => {
    const metaElement = nonNullable(
      document.querySelector('[data-name="is-hydration-render"]'),
      "Add component HydrationRenderChecker in the body of the document"
    );

    metaElement.setAttribute("data-content", "false");
    isHydrationRender = false;
  }, []);

  return (
    <div
      data-name="is-hydration-render"
      data-content={`${isHydrationRender}`}
    ></div>
  );
}
