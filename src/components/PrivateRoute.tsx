import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "./Navbar/SignIn";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	// Auth Context
	const { user } = useAuth();

	// * ChakraUI
	// Modal hooks
	const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

	// React Router
	const history = useHistory();

	const custOnClose = () => {
		onClose();
		history.push("/");
	};

	return (
		<Route
			{...rest}
			render={(props) => {
				return user ? <Component {...props} /> : <SignIn isOpen={isOpen} onClose={custOnClose} />;
			}}></Route>
	);
};

export default PrivateRoute;
