import { ref, onMounted } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref(true);
  const error = ref<Error | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      data.value = await response.json();
      loading.value = false;
    } catch (err) {
      error.value = err as Error;
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return { data, loading, error, refetch: fetchData };
}
