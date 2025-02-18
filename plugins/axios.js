/* export default defineNuxtPlugin((nuxtApp) => {
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
   */

import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const accessToken = useCookie('accessToken');

  const api = axios.create({
    baseURL: useRuntimeConfig().public.apiBase, // Replace with your API
    headers: {
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
    credentials: 'true',
  });

  nuxtApp.provide('axios', api);
});