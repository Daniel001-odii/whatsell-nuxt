export default defineNuxtRouteMiddleware((to, from) => {
    const accessToken = useCookie('accessToken');
    if (!accessToken) {
      return navigateTo('/login') // Redirect to login if not authenticated
    }
  })
  