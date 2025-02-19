// plugins/apiFetch.js
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  const axiosInstance = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      // Dynamically get the token from the cookie on each request
      const token = useCookie('accessToken').value;
      options.headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
      };
    },
  });

  return {
    provide: {
      apiFetch: axiosInstance,
    },
  };
});