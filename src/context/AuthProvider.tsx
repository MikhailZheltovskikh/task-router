import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from 'react';
import { getUserFromStorage } from '../utils';

type IUser = {
	email: string;
	password: string;
};

type AuthContextType = {
	user: IUser | null;
	signin: (newUser: IUser, callback: () => void) => void;
	signout: () => void;
};

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(() => getUserFromStorage());

	const signin = useCallback(
		(newUser: IUser, callback: () => void) => {
			if (!user) {
				setUser(newUser);
				localStorage.setItem('user', JSON.stringify(newUser));
				callback();
			}
		},
		[user, setUser],
	);

	const signout = useCallback(() => {
		if (user) {
			setUser(null);
			localStorage.removeItem('user');
		}
	}, [user, setUser]);

	const value: AuthContextType = {
		user,
		signin,
		signout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
