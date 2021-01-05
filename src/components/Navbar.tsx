import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

interface Props {}

const Navbar = (props: Props) => {
	return (
		<>
			<Box borderBottom='1px solid #EBEBEB' w='100%'>
				<Flex justify='space-between' py={2} px={4}>
					<Text>Home</Text>
					<Text>Bug Tracker</Text>
					<Flex justify='center' align='center'>
						<Text>Sign In</Text>
						<Button>Sign Up</Button>
					</Flex>
				</Flex>
			</Box>
		</>
	);
};

export default Navbar;
