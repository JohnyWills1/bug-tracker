import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const signUp = (email, password, username) => {
		return auth.createUserWithEmailAndPassword(email, password).then((result) => {
			result.user.updateProfile({ displayName: username });
		});
	};

	const signOut = () => {
		auth.signOut();
		setUser(null);
	};

	const logIn = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	const forgotPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	};

	const updateEmail = (email) => {
		return user.updateEmail(email);
	};

	const updatePassword = (password) => {
		return user.updatePassword(password);
	};

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((newUser) => {
			setUser(newUser);
			setIsLoading(false);
		});

		return unsub;
	}, []);

	return (
		<AuthContext.Provider value={{ user, signUp, signOut, logIn, forgotPassword, updatePassword, updateEmail, isLoading }}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};
