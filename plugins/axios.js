/* // plugins/apiFetch.js
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
}); */

// plugins/apiFetch.js
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const axiosInstance = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const token = useCookie('accessToken').value;
      options.headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
      };
    },
    onResponseError({ response }) {
      // If the token is invalid or expired, redirect to login
      if (response.status === 401) {
        const token = useCookie('accessToken');
        token.value = null; // Clear the token
        navigateTo('/login');
      }
    },
  });

  return {
    provide: {
      apiFetch: axiosInstance,
    },
  };
});