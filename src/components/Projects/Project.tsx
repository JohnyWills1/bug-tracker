import React from "react";
import { Flex } from "@chakra-ui/react";
import { Redirect, useParams } from "react-router-dom";
import initialData from "../../testdata";
import Board from "../Kanban/Board";

interface Props {}

const Project = (props: Props) => {
	const { id }: any = useParams();

	const projectData = initialData.find((project: any) => {
		return project.id === id;
	});

	// Redirect if project does not exist
	if (projectData === undefined) {
		return <Redirect to={"/404"} />;
	}

	return (
		<Flex align='center' px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
			<Board projectData={projectData} />
		</Flex>
	);
};

export default Project;
