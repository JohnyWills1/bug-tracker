import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
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

	// Redirect if project does not exist
	if (projectData === undefined) {
		return <PageNotFound />;
	}

	return (
		<Flex align='center' px={5} py={6} ml='50px' flexDirection='column' minH='90vh' h='auto'>
			<Sidebar />
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
		</Flex>
	);
};

export default Project;
