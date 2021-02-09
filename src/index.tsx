import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./Projects";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Project from "./components/Projects/Project";
import PageNotFound from "./PageNotFound";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<ChakraProvider>
					<Navbar />
					<Switch>
						<Route exact path='/' component={Home} />
						<PrivateRoute exact path='/projects' component={Projects} />
						<PrivateRoute exact path='/projects/:id' component={Project} />
						<PrivateRoute exact path='/update-profile' component={UpdateProfile} />
						<Route exact path='/forgot-password' component={ForgotPassword} />
						<Route component={PageNotFound} />
					</Switch>
					<Footer />
				</ChakraProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
