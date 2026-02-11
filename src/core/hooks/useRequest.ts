import { ref, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export interface UseRequestOptions {
  immediate?: boolean;
}

export interface UseRequestReturn<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: () => Promise<T>;
  getData: () => T | null;
  getLoading: () => boolean;
  getError: () => Error | null;
}

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
    data: data as Ref<T | null>,
    loading: loading as Ref<boolean>,
    error: error as Ref<Error | null>,
    execute: execute as () => Promise<T>,
    getData: () => data.value,
    getLoading: () => loading.value,
    getError: () => error.value,
  };
}
