import React from "react";
import { Box, Flex, Stack, Link } from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface Props {}

const Navbar = (props: Props) => {
	return (
		<>
			<Box borderBottom='1px solid #EBEBEB' w='100%'>
				<Flex justify='space-between' align='center' py={2} px={4}>
					<Link href='/test'>Bug Tracker</Link>

					<Stack w='fit-content' isInline>
						<SignIn />
						<SignUp />
					</Stack>
				</Flex>
			</Box>
		</>
	);
};

export default Navbar;
