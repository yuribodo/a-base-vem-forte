"use client";
import { createContext, useEffect, useState } from "react";

interface User {
	firstName: string;
	lastName: string;
	documentType: string;
	cpf: string;
	phoneNumber: string;
	enterpriseSegment: string;
	email: string;
}

interface AuthContextProps {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isLogged: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token !== null) {
			setIsLogged(true);
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, isLogged }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
