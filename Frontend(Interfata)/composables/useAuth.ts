import { registerRuntimeCompiler } from "vue";
import type { userType } from "~/types/user.types";

interface requestUserType {
  email: string,
  password: string,
  name?: string
}
export const useAuth = () => {
  const me = useState<userType|null>('me');
  const meLoaded = useState<boolean>('meLoaded', () => false);

  const getUser = async (): Promise<void> => {
    if (me.value?.success || meLoaded.value) return;

    try {
      const response = await useGladAPI().get<userType, {}>(
        'authenticate/thisUser',
        undefined,
        { credentials: 'include' }
      );
      me.value = response as userType;
    } catch (error) {
      console.error(error);
      me.value = null; // ensure it's null if request failed
    } finally {
      meLoaded.value = true;
    }
  };
  const login = async (email: string, password: string): Promise<userType | undefined> => {
    try {
      const response = await useGladAPI().post<userType, requestUserType>
        ('authenticate/login',
          { email, password },
          { credentials: 'include' });
      return response as userType;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<userType> => {
    try {
      const response = await useGladAPI().post<userType, requestUserType>('authenticate/signup', { email, password, name });
      return response as userType;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { 
    login,
    signup,
    getUser,
    meLoaded
  };
}