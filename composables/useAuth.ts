
export const useAuth = () => {
  const config = useRuntimeConfig();
  const token = useCookie('auth_token'); // Store token in a cookie for persistence
  const user = useState('user', () => null); // Global state for the logged-in user

  // Login Function
  const login = async (emailOrPhone: string, password: string) => {
    try {
      const { data, error } = await useFetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        baseURL: config.public.apiBase,
        body: { emailOrPhone, password }
      });

      if (error) throw error;

      console.log("loggedin :", data);
      return data.value;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  // Logout Function
  const logout = () => {
    token.value = null; // Remove token
    user.value = null; // Clear user state
    navigateTo('/login'); // Redirect to login page
  };

  return { user, token, login, logout };
}
