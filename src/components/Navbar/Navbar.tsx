import React, { useState } from "react";
import {
	Box,
	Flex,
	Stack,
	Text,
	Button,
	useDisclosure,
	Avatar,
	AvatarBadge,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	MenuGroup,
	MenuDivider,
} from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowForwardIcon, EditIcon } from "@chakra-ui/icons";

interface Props {}

const Navbar = (props: Props) => {
	// Auth Context
	const { user, signOut } = useAuth();

	// const { pathname }: any = useLocation();

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
									<Menu>
										<MenuButton style={{ cursor: "pointer" }}>
											<Avatar name={user.displayName} size='md'>
												<AvatarBadge boxSize='1.25em' bg='green.500' />
											</Avatar>
										</MenuButton>

										<MenuList>
											<MenuGroup textAlign='center' title={user.displayName}>
												<MenuDivider />
												<MenuItem icon={<EditIcon />} as={RouterLink} to='/update-profile'>
													Update Profile
												</MenuItem>
												<MenuItem
													icon={<ArrowForwardIcon />}
													onClick={() => {
														onClose();
														signOut();
														history.push("/");
													}}>
													Sign Out
												</MenuItem>
											</MenuGroup>
										</MenuList>
									</Menu>
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
