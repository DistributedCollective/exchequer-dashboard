import { useEffect, useRef, useState } from 'react';
import { httpClient } from '../utils/http-client';

type FetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T = unknown>(
  url: string,
  reFetchCondition?: any,
): FetchResponse<T> {
  const [state, setState] = useState<FetchResponse<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const controller = useRef<AbortController>();

  useEffect(() => {
    controller.current = new AbortController();

    setState(prevState => ({ ...prevState, loading: true, error: null }));

    httpClient
      .get<T>(url, {
        signal: controller.current.signal,
      })
      .then(response => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: null,
          data: response,
        }));
      })
      .catch(error => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: error,
          data: null,
        }));
      });

    return () => {
      controller.current && controller.current.abort();
    };
  }, [url, reFetchCondition]);

  return state;
}
