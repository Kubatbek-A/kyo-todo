import {
  DependencyList,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export default function ReMount(props: {
  children: ReactNode;
  deps: DependencyList;
  withMs?: number;
}) {
  const [currentKey, setCurrentKey] = useState(0);

  const newestRender = useRef(0);
  const currentRender = newestRender.current;

  newestRender.current++;

  useEffect(() => {
    if (currentRender > 0) {
      if (props.withMs === undefined) {
        setCurrentKey((old) => (old === 0 ? 1 : 0));
      } else {
        const id = setTimeout(() => {
          setCurrentKey((old) => (old === 0 ? 1 : 0));
        }, props.withMs);

        return () => clearTimeout(id);
      }
    }
  }, props.deps);

  return <Fragment key={currentKey}>{props.children}</Fragment>;
}
