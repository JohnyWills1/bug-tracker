import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Projects from "../Projects";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	// Auth Context
	const { user } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return user ? <Component {...props} /> : <Projects />;
			}}></Route>
	);
};

export default PrivateRoute;
