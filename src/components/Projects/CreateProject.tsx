import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CreateProjectModal from "./CreateProjectModal";

interface Props {}

const CreateProject = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box
				rounded='lg'
				bg='#F4F5F7'
				w='250px'
				h='150px'
				_hover={{ bg: "#EBECF0", cursor: "pointer" }}
				onClick={onOpen}
				p={2}>
				<Flex align='center' justify='center' w='100%' h='100%' flexDirection='column'>
					Create a new project
				</Flex>
			</Box>

			<CreateProjectModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default CreateProject;
