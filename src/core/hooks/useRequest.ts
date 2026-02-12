import { ref, onUnmounted } from 'vue';
import type { UseRequestOptions, UseRequestReturn } from './types';

export function useRequest<T>(
  requestFn: () => Promise<T>,
  options: UseRequestOptions = {}
): UseRequestReturn<T> {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  let isMounted = true;

  const execute = async (): Promise<T> => {
    if (!isMounted) {
      return Promise.reject(new Error('Component is unmounted'));
    }

    loading.value = true;
    error.value = null;

    try {
      const result = await requestFn();
      if (isMounted) {
        data.value = result;
      }
      return result;
    } catch (err) {
      if (isMounted) {
        error.value = err as Error;
      }
      throw err;
    } finally {
      if (isMounted) {
        loading.value = false;
      }
    }
  };

  if (options.immediate) {
    execute();
  }

  onUnmounted(() => {
    isMounted = false;
  });

  return {
    data: data,
    loading: loading,
    error: error,
    execute: execute,
    getData: () => data.value,
    getLoading: () => loading.value,
    getError: () => error.value,
  } as UseRequestReturn<T>;
}
