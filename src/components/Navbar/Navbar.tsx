import React, { useContext } from "react";
import { Box, Flex, Stack, Text, Button } from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {}

const Navbar = (props: Props) => {
	const { user, signOut } = useContext(AuthContext);

	return (
		<>
			<Box borderBottom='1px solid #EBEBEB' w='100%'>
				<Flex justify='space-between' align='center' py={2} px={4} my={4}>
					<Text bgGradient='linear(to-l, #7928CA,#FF0080)' bgClip='text' fontSize='5xl' fontWeight='extrabold'>
						<Link to='/'>Bug Tracker</Link>
					</Text>

					<Stack w='fit-content' align='center' spacing={5} isInline>
						{user ? (
							<>
								<p>{user.email}</p>
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
					</Stack>
				</Flex>
			</Box>
		</>
	);
};

export default Navbar;
