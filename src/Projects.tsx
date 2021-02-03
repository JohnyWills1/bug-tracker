import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import ProjectsList from "./components/Projects/ProjectsList";
import initialData from "./testdata";

interface Props {}

const Projects = (props: Props) => {
	// Save initial projects to state
	const [projects, setProjects] = useState(initialData);

	// Find initial starred projects and save to state
	const initialStarredProjects = initialData.filter((project: any) => project.starred === true);
	const [starredProjects, setStarredProjects] = useState(initialStarredProjects);

	const addToStarred = (projectId: any) => {
		// TODO: add true to project and filter through all projects again to get a new list of starred projects
	};

	const deleteProject = (projectId: any) => {
		// TODO: remove project from array and save new array to state
	};

	const removeFromStarred = (projectId: any) => {
		// TODO: use id to find and change starred boolean to false, then filter
		// projects again, finally update state
	};

	return (
		<Flex align='center' px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
			{/* <Heading bgClip='text' textAlign='center' w='50%' bgGradient='linear(to-r, #660708,#ba181b,#e5383b)' mb={6}>
				Dashboard
			</Heading> */}

			<Heading pb='1rem'>Starred</Heading>
			<ProjectsList projects={starredProjects} showAddNew={false} />

			<Heading pb={4} pt={6}>
				Projects
			</Heading>
			<ProjectsList projects={projects} showAddNew={true} />
		</Flex>
	);
};

export default Projects;
