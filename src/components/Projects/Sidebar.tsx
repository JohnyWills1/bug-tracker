import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { Icon, ItemText, NavLeft } from "./Styles";

interface Props {
	addIssue: () => void;
}

const Sidebar = ({ addIssue }: Props) => {
	return (
		<>
			<Flex
				justify='center'
				align='center'
				position='fixed'
				left='0px'
				top='50%'
				background='linear-gradient(135deg, #dc2f02, #e85d04 , #faa307);'
				borderRadius='0px 100px 100px 0px'
				w='60px'
				h='80px'>
				<IconButton icon={<AddIcon />} onClick={() => addIssue()} rounded='full' aria-label='add issue to project' />
			</Flex>
		</>
	);
};

export default Sidebar;
