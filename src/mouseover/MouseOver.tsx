import React, { useEffect, useRef } from "react";
import Styles from "./MouseOver.module.css";
import { fromEvent, timer, merge } from "rxjs";
import { tap, switchMap } from "rxjs/operators";

export const MouseOver: React.FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mouseover$ = fromEvent<MouseEvent>(ref.current!, "mouseover");
    const mouseout$ = fromEvent<MouseEvent>(ref.current!, "mouseout");
    const subscription = merge(mouseover$, mouseout$)
      .pipe(
        switchMap(event => {
          console.log(event.type);
          return timer(1000);
        }),
        tap(value => console.log(value))
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={Styles["container"]} ref={ref}>
      content
    </div>
  );
};
