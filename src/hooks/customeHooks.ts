import { EffectCallback, useEffect } from 'react';

export const useEffectOnce = (action: EffectCallback) =>
  useEffect(() => {
    action();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEffectWithParams = (action: EffectCallback, params: Array<any>, callBackAction?: EffectCallback) =>
  useEffect(() => {
    action();

    return () => {
      callBackAction && callBackAction();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, params);
