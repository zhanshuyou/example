import React, { FC, useRef, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { map, filter, tap } from 'rxjs/internal/operators';

type Props = {
  loading: boolean;
  onScrollBottom(): void;
} & React.HTMLAttributes<HTMLDivElement>;

export const ScrollView: FC<Props> = props => {
  const { loading, onScrollBottom, ...restProps } = props;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const subscription = fromEvent<React.ChangeEvent<HTMLDivElement>>(container.current, 'scroll')
      .pipe(
        map(event => {
          return {
            scrollTop: event.target.scrollTop,
            scrollHeight: event.target.scrollHeight,
            clientHeight: event.target.clientHeight,
          };
        }),
        filter(x => x.clientHeight === x.scrollHeight - x.scrollTop),
        tap(() => {
          if (loading) {
            return;
          }
          onScrollBottom();
        }),
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [onScrollBottom, loading]);

  return (
    <div {...restProps} ref={container}>
      {props.children}
      {loading && <div>loading...</div>}
    </div>
  );
};
