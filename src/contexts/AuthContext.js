import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

// export function useAuth() {
// 	return useContext(AuthContext);
// }

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const signUp = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const signOut = () => {
		auth.signOut();
		setUser(null);
	};

	const logIn = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((newUser) => {
			setUser(newUser);
			setIsLoading(false);
		});

		return unsub;
	}, []);

	return (
		<AuthContext.Provider value={{ user, signUp, signOut, logIn, isLoading }}>{!isLoading && children}</AuthContext.Provider>
	);
};
