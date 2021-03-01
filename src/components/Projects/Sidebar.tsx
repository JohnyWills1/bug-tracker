import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Icon, ItemText, NavLeft } from "./Styles";

interface Props {
	addIssue: () => void;
}

const Sidebar = ({ addIssue }: Props) => {
	return (
		<>
			<NavLeft>
				<Flex justify='center' align='center' flexDirection='column' pt='20px'>
					<Icon>
						<AddIcon w='22px' h='24px' />
					</Icon>
					<Box onClick={() => addIssue()}>
						<ItemText>
							<Flex justify='center' align='center'>
								<AddIcon w='22px' h='24px' mr='10px' />
								Add Issue
							</Flex>
						</ItemText>
					</Box>
				</Flex>
			</NavLeft>
		</>
	);
};

export default Sidebar;
