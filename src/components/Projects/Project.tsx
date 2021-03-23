import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import initialData from "../../testdata";
import Board from "../Kanban/Board";
import PageNotFound from "../../PageNotFound";
import Sidebar from "./Sidebar";
import CreateIssueModal from "../Kanban/Issue/CreateIssueModal";

interface Props {}

const Project = (props: Props) => {
	const { id }: any = useParams();

	const initProjectData = initialData.find((project: any) => {
		return project.id === id;
	});

	const [projectData, setProjectData]: any = React.useState(initProjectData);

	// Chakra UI
	const { isOpen, onOpen, onClose } = useDisclosure();

	const openAddIssueModal = () => {
		onOpen();
	};

	// Redirect if project does not exist
	if (projectData === undefined) {
		return <PageNotFound />;
	}

	const addNewIssue = (issue: any) => {
		setProjectData((prevData: any) => {
			const newIssues = {
				...prevData.issues,
				[issue.id]: issue,
			};

			const newColumn = {
				...prevData.columns[prevData.columnOrder[0]],
				issueIds: [...prevData.columns[prevData.columnOrder[0]].issueIds, issue.id],
			};

			const newColumns = {
				...prevData.columns,
				[prevData.columnOrder[0]]: newColumn,
			};

			const newData = {
				...prevData,
				issues: newIssues,
				columns: newColumns,
			};

			return newData;
		});
	};

	return (
		<Flex align='center' px={5} py={6} ml='50px' flexDirection='column' minH='90vh' h='auto'>
			<Sidebar addIssue={openAddIssueModal} />

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

			<Board boardData={projectData} setBoardData={setProjectData} />

			<CreateIssueModal isOpen={isOpen} onClose={onClose} addNewIssue={addNewIssue} users={projectData.users} />
		</Flex>
	);
};

export default Project;
