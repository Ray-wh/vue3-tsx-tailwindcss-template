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