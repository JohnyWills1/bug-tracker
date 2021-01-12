import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface Props {}

const Footer = (props: Props) => {
	return (
		<>
			<Box borderTop='1px solid #EBEBEB' w='100%'>
				<Flex justify='center' align='center' py={2} px={4}>
					<Text>Made with 🧡 by Johny Wills</Text>
				</Flex>
			</Box>
		</>
	);
};

export default Footer;
