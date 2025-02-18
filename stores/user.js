import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    credits: 0,
    loading: false,
    error: null
  }),

  actions: {
    async getUserDetails() {
      const { $axios } = useNuxtApp() // Use inside the function
      const config = useRuntimeConfig() // Use inside the function

      try {
        const res = await $axios.get(`${config.public.apiBase}/user`)
        this.user = res.data.user
        this.credits = res.data.credits;
      } catch (error) {
        this.error = error.message
        console.error('Error fetching user:', error)
      }
    },

    async fetchUser() {
      if (this.user) return // Avoid redundant API calls

      this.loading = true
      this.error = null
      try {
        const { data, error } = await useFetch('/api/user') // Replace with actual API
        if (error.value) throw new Error(error.value.message)
        this.user = data.value
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

  
    async logout(){
      const toast = useToast()
      const accessToken = useCookie('accessToken');
      const refreshToken = useCookie('refreshToken');
      try{
        accessToken.value = null;
        refreshToken.value = null;
        toast.add({ title: "You logged out!" })
        window.location.reload();
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
  }
})
