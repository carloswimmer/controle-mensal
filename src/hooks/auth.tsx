import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User, UserCredential } from '@firebase/auth-types'
import { auth } from '../firebase'

export interface AuthData {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signUp(data: AuthData): Promise<UserCredential>
  signIn(data: AuthData): Promise<UserCredential>
  signOut(): Promise<void>
  resetPassword(email: string): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      user && setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signUp = useCallback(({ email, password }: AuthData) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }, [])

  const signIn = useCallback(({ email, password }: AuthData) => {
    return auth.signInWithEmailAndPassword(email, password)
  }, [])

  const signOut = useCallback(() => {
    return auth.signOut()
  }, [])

  const resetPassword = useCallback((email: string) => {
    return auth.sendPasswordResetEmail(email)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, resetPassword }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => useContext(AuthContext)

export { useAuth, AuthProvider }
