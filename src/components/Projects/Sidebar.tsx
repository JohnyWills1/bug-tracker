import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Icon, ItemText, NavLeft } from "./Styles";

interface Props {}

const Sidebar = (props: Props) => {
	return (
		<>
			<NavLeft>
				<Flex justify='center' align='center' flexDirection='column' pt='20px'>
					<Icon>
						<AddIcon w='22px' h='24px' />
					</Icon>
					<ItemText>Add Issue</ItemText>
				</Flex>
			</NavLeft>
		</>
	);
};

export default Sidebar;
