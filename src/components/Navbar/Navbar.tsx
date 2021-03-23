import React, { useState } from "react";
import { Box, Flex, Stack, Text, Button, Link, useDisclosure } from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { CalendarIcon } from "@chakra-ui/icons";

interface Props {}

const Navbar = (props: Props) => {
	// Auth Context
	const { user, signOut } = useAuth();

	const { pathname }: any = useLocation();

	// * ChakraUI
	// Modal hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	// React Router
	const history = useHistory();

	// Hooks
	const [isSignInOpen, setSignInOpen] = useState(false);

	const openSignIn = () => {
		setSignInOpen(true);
	};

	const onSignInClose = () => {
		setSignInOpen(false);
	};

	return (
		<>
			<Box w='100%'>
				<Flex justify='space-between' align='center' py={1} px={4} my={2} mx='50px'>
					<Text
						bgGradient='linear(to-r, #dc2f02, #e85d04 , #faa307)'
						bgClip='text'
						fontSize='5xl'
						fontWeight='extrabold'
						letterSpacing='-2px'
						_hover={{ opacity: 0.7 }}
						transition='opacity 0.3s ease-in 30ms'>
						<RouterLink to='/projects'>Bug Tracker</RouterLink>
					</Text>

					<Stack w='fit-content' align='center' spacing={5} isInline>
						<>
							{user ? (
								<>
									<Flex
										as={RouterLink}
										to='/projects'
										mr={1}
										p={2}
										align='center'
										rounded='lg'
										bgColor={"#F4F5F7"}
										shadow={pathname === "/projects" ? "outline" : "none"}
										_hover={{ bgColor: "#EBECF0" }}>
										<CalendarIcon w={5} h={5} color='red.400' />
									</Flex>
									<Link
										as={RouterLink}
										to='/update-profile'
										p={2}
										rounded='lg'
										bgColor='#F4F5F7'
										shadow={pathname === "/update-profile" ? "outline" : "none"}
										_hover={{ bgColor: "#EBECF0" }}>
										{user.email}
									</Link>
									<Button
										colorScheme='red'
										onClick={() => {
											onClose();
											signOut();
											history.push("/");
										}}>
										Sign Out
									</Button>
								</>
							) : (
								<>
									<Button onClick={openSignIn}>Sign In</Button>
									{isSignInOpen && <SignIn isOpen={isSignInOpen} onClose={onSignInClose} />}
									<Button onClick={onOpen}>Sign Up</Button>
									{isOpen && <SignUp isOpen={isOpen} onClose={onClose} />}
								</>
							)}
						</>
					</Stack>
				</Flex>
			</Box>
		</>
	);
};

export default Navbar;
