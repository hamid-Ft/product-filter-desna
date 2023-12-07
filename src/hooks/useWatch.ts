import { useEffect, useRef, EffectCallback, DependencyList } from "react";

export function useWatch(
  func: EffectCallback,
  deps: DependencyList | undefined
) {
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (mounted.current === true) {
      func();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
}
