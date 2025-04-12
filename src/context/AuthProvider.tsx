import React, { createContext, useContext, useState, ReactNode } from 'react';

type IUser = {
	email: string;
	password: string;
};

type AuthContextType = {
	user: IUser | null;
	isLogout: boolean,
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
	const [user, setUser] = useState<IUser | null>(() => {
		const savedUser = localStorage.getItem('user');
		if (!savedUser) return null;
		const parsedUser = JSON.parse(savedUser);
		if (typeof parsedUser === 'string') {
			return {
				email: parsedUser,
			};
		}
		return parsedUser;
	});

	const [isLogout, setIsLogout] = useState(false);

	const signin = (newUser: IUser, callback: () => void) => {
		setIsLogout(false)
		setUser(newUser);
		localStorage.setItem('user', JSON.stringify(newUser.email));
		callback();
	};



	const signout = () => {
		setIsLogout(true)
		setUser(null);
		localStorage.removeItem('user');
	};

	const value: AuthContextType = {
		user,
		signin,
		signout,
		isLogout
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
