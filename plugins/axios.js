export default defineNuxtPlugin((nuxtApp) => {
    const accessToken = useCookie('accessToken');
  
    nuxtApp.hook('app:created', () => {
      nuxtApp.$axios = $fetch.create({
        baseURL: useRuntimeConfig().public.apiBase,
        headers: {
          Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
        },
        credentials: 'include', // Ensures cookies are sent if backend uses HttpOnly cookies
      });
    });
  });
  