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
import CreateIssueModal from "../Kanban/Issue/CreateIssueModal";

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

	const addNewIssue = (issue: any) => {
		console.log(issue);
	};

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

			<CreateIssueModal isOpen={isOpen} onClose={onClose} addNewIssue={addNewIssue} users={projectData.users} />
		</Flex>
	);
};

export default Project;
