import React, { useState } from "react";
import { Box, Flex, Stack, Text, Button, Link, useDisclosure, IconButton } from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AddIcon } from "@chakra-ui/icons";
import CreateProjectModal from "../Projects/CreateProjectModal";

interface Props {}

const Navbar = (props: Props) => {
	// Auth Context
	const { user, signOut } = useAuth();

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
			<Box borderBottom='1px solid #EBEBEB' w='100%'>
				<Flex justify='space-between' align='center' py={1} px={4} my={2} mx={4}>
					<Text
						bgGradient='linear(to-r, #dc2f02, #e85d04 , #faa307)'
						bgClip='text'
						fontSize='5xl'
						fontWeight='extrabold'
						letterSpacing='-3px'>
						<RouterLink to='/'>Bug Tracker</RouterLink>
					</Text>

					<Stack w='fit-content' align='center' spacing={5} isInline>
						<>
							{user ? (
								<>
									<IconButton aria-label='create a project button' icon={<AddIcon />} onClick={onOpen} />

									<CreateProjectModal isOpen={isOpen} onClose={onClose} />

									<Link as={RouterLink} to='/projects'>
										Projects
									</Link>
									<Link as={RouterLink} to='/update-profile'>
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
