import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import initialData from "../../testdata";
import Board from "../Kanban/Board";
import PageNotFound from "../../PageNotFound";
import Sidebar from "./Sidebar";

interface Props {}

const Project = (props: Props) => {
	const { id }: any = useParams();

	const projectData = initialData.find((project: any) => {
		return project.id === id;
	});

	// Chakra UI
	const { isOpen, onOpen, onClose } = useDisclosure();

	const addIssue = () => {
		onOpen();
	};

	// Redirect if project does not exist
	if (projectData === undefined) {
		return <PageNotFound />;
	}

	return (
		<Flex align='center' px={5} py={6} ml='50px' flexDirection='column' minH='90vh' h='auto'>
			<Sidebar addIssue={addIssue} />

			<Breadcrumb pb={2}>
				<BreadcrumbItem>
					<BreadcrumbLink href='/projects'>Projects</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<BreadcrumbLink href='' isCurrentPage>
						{id}
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Board projectData={projectData} />

			{isOpen && (
				<>
					<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Modal Title</ModalHeader>
							<ModalCloseButton />
							<ModalBody>Test</ModalBody>

							<ModalFooter>
								<Button colorScheme='blue' mr={3} onClick={onClose}>
									Close
								</Button>
								<Button variant='ghost'>Secondary Action</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
			)}
		</Flex>
	);
};

export default Project;
