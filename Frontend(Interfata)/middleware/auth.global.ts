import type { userType } from "~/types/user.types";

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;

  const { meLoaded, getUser } = useAuth();
  const me = useState<userType| null>('me');

  // Only fetch if not loaded yet
  if (!meLoaded.value) {
    try {
      await getUser();
    } catch (e) {
      console.error('Auth middleware error:', e);
      return await navigateTo('/user/login');
    }
  }

  if (!me.value?.success && to.path !== '/user/login') {
    return await navigateTo('/user/login');
  }

  if (me.value?.success && to.path === '/user/login') {
    return await navigateTo('/');
  }
});