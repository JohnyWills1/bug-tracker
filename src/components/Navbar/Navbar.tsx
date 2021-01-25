import React from "react";
import { Box, Flex, Stack, Text, Button, Link } from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface Props {}

const Navbar = (props: Props) => {
	const { user, signOut } = useAuth();

	return (
		<>
			<Box borderBottom='1px solid #EBEBEB' w='100%'>
				<Flex justify='space-between' align='center' py={2} px={4} my={4}>
					<Text bgGradient='linear(to-l, #7928CA,#FF0080)' bgClip='text' fontSize='5xl' fontWeight='extrabold'>
						<RouterLink to='/'>Bug Tracker</RouterLink>
					</Text>

					<Stack w='fit-content' align='center' spacing={5} isInline>
						<>
							{user ? (
								<>
									<Link as={RouterLink} to='/dashboard'>
										Dashboard
									</Link>
									<Link as={RouterLink} to='/update-profile'>
										{user.email}
									</Link>
									<Button colorScheme='red' onClick={signOut}>
										Sign Out
									</Button>
								</>
							) : (
								<>
									<SignIn />
									<SignUp />
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
