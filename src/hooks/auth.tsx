import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User as FirebaseUser, UserCredential } from 'firebase/auth'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  updateEmail as updateFirebaseEmail,
  updatePassword as updateFirebasePassword,
} from 'firebase/auth'

export interface AuthData {
  email: string
  password: string
}

interface AuthContextData {
  user: FirebaseUser | null
  signUp(data: AuthData): Promise<UserCredential>
  signIn(data: AuthData): Promise<UserCredential>
  signOut(): void
  resetPassword(email: string): Promise<void>
  updateEmail(email: string): void
  updatePassword(password: string): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      user && setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUp = async ({ email, password }: AuthData) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = async ({ email, password }: AuthData) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = () => {
    signOutFirebase(auth)
  }

  const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
  }

  const updateEmail = (email: string) => {
    user && updateFirebaseEmail(user, email)
  }

  const updatePassword = (password: string) => {
    user && updateFirebasePassword(user, password)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => useContext(AuthContext)

export { useAuth, AuthProvider }
