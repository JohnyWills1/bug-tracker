import React from "react";
import { Box, Flex, Text, Link, Stack, Icon } from "@chakra-ui/react";
import { VscSymbolNamespace } from "react-icons/vsc";

interface Props {}

const Footer = (props: Props) => {
	return (
		<>
			<Box borderTop='1px solid #EBEBEB' w='100%'>
				<Flex justify='center' align='center' flexDirection='column' py={2} px={4} my={6}>
					<Text>Made with 🧡 by Johny Wills</Text>
					<Stack isInline>
						<Link href='https://github.com/JohnyWills1'>GitHub</Link>
						<Icon as={VscSymbolNamespace} h={6} w={6} />
						<Link href='https://mobile.twitter.com/Jyonii_'>Twitter</Link>
					</Stack>
				</Flex>
			</Box>
		</>
	);
};

export default Footer;
