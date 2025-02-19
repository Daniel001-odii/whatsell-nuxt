/* import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()

  // Fetch user details only if not already set
  if (!userStore.user) {
    await userStore.getUserDetails()
  }

  const isLoggedIn = !!userStore.user // Convert to boolean


  // avoid visit to login page is logged in....
  if (isLoggedIn && to.path == "/login" 
    || isLoggedIn && to.path == "/register") {
    return navigateTo("/")
  }

  // Redirect to login page if not logged in and visiting account section
  if (!isLoggedIn && to.path.startsWith("/account")) {
    return navigateTo("/login")
  }
})
 */

export default defineNuxtRouteMiddleware(()=>{

})