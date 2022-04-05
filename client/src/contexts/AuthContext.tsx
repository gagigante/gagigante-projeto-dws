import { useRouter } from 'next/router'
import { 
  createContext, 
  ReactNode, 
  useCallback, 
  useContext, 
  useEffect, 
  useState 
} from 'react'

import { api } from '../services/api'

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter()

  const [data, setData] = useState<AuthState>({} as AuthState)

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (token && user) {
        (api.defaults.headers as any).authorization = `Bearer ${token}`

        setData({ token: token, user: JSON.parse(user) })
      }
    }

    loadStoragedData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    (api.defaults.headers as any).authorization = `Bearer ${token}`

    setData({ token, user })
  }, [setData])

  const signOut = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setData({} as AuthState)
    push('/')
  }, [setData])

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}