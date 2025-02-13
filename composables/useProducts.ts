export function useProducts() {
    const config = useRuntimeConfig()
    const products = ref([])
    const pending = ref(true)
    const error = ref(null)
  
    // Fetch products with SSR and caching
    const fetchProducts = async () => {
      try {
        const { data, pending: loading, error: err } = await useAsyncData('products', () =>
          $fetch(`${config.public.apiBase}/products`)
        )
        products.value = data.value || []
        pending.value = loading.value
        error.value = err.value
      } catch (err) {
        console.error("Error fetching products:", err)
        error.value = err
      }
    }
  
    // Fetch products on load
    fetchProducts()
  
    return { products, pending, error, fetchProducts }
  }
  