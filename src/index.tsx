import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./Projects";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Project from "./components/Projects/Project";
import PageNotFound from "./PageNotFound";
import Loading from "./Loading";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<ChakraProvider>
					<Loading>
						<Navbar />
						<Switch>
							<PrivateRoute exact path='/projects' component={Projects} />
							<PrivateRoute exact path='/projects/:id' component={Project} />
							<PrivateRoute exact path='/update-profile' component={UpdateProfile} />
							<Route exact path='/forgot-password' component={ForgotPassword} />
							<Redirect from='/' to='/projects' />
							<Route component={PageNotFound} />
						</Switch>
						<Footer />
					</Loading>
				</ChakraProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
