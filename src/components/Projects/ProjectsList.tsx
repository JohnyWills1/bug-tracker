import React from "react";
import { Link } from "react-router-dom";
import {
	Box,
	Button,
	Flex,
	Grid,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import initialData from "../../testdata";
import { CloseIcon } from "@chakra-ui/icons";

interface Props {}

const ProjectsList = (props: Props) => {
	const projects = initialData;

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Grid w='fit-content' templateColumns={projects.length >= 4 ? "repeat(4,1fr)" : `repeat(${projects.length},1fr)`} gap={4}>
			{projects.map((project: any) => {
				return (
					<Box rounded='lg' border='1px solid #EBEBEB' w='250px' h='150px' p={2} shadow='base'>
						<Flex w='100%' h='100%' flexDirection='column'>
							<Flex justify='flex-end'>
								<IconButton variant='outline' aria-label='delete project' icon={<CloseIcon />} size='xs' />
							</Flex>
							<Link to={"/projects/" + project.id} style={{ width: "100%", height: "100%" }}>
								<Flex align='center' justify='center' w='100%' h='100%'>
									{project.projectTitle}
								</Flex>
							</Link>
						</Flex>
					</Box>
				);
			})}
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
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<form>
						<ModalHeader>New Project</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Input placeholder='Project Title' />
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={onClose}>
								Close
							</Button>
							<Button colorScheme='green'>Create Project</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Grid>
	);
};

export default ProjectsList;
