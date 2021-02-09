import { CalendarIcon, StarIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import ProjectsList from "./components/Projects/ProjectsList";
import initialData from "./testdata";
import { v4 as uuidv4 } from "uuid";

interface Props {}

const Projects = (props: Props) => {
	// Save initial projects to state
	const [projects, setProjects] = useState(initialData);

	// Find initial starred projects and save to state
	const initialStarredProjects = initialData.filter((project: any) => project.starred === true);
	const [starredProjects, setStarredProjects] = useState(initialStarredProjects);

	const addToStarred = (projectId: any) => {
		handleStarred(projectId, true);
	};

	const removeFromStarred = (projectId: any) => {
		handleStarred(projectId, false);
	};

	const handleStarred = (projectId: any, addOrRemove: boolean) => {
		setProjects((prevData: any) => {
			let removedProject = prevData.find((project: any) => project.id === projectId);
			const removedProjectIndex = prevData.indexOf(removedProject);
			let removedProjectsList = prevData.filter((project: any) => project.id !== projectId);

			removedProject.starred = addOrRemove;
			removedProjectsList.splice(removedProjectIndex, 0, removedProject);

			let newData = [...removedProjectsList];

			const newStarredList = newData.filter((project: any) => project.starred === true);

			setStarredProjects(newStarredList);

			return newData;
		});
	};

	const deleteProject = (projectId: any) => {
		setProjects((prevData: any) => {
			const newData = prevData.filter((project: any) => project.id !== projectId);

			const newStarredList = newData.filter((project: any) => project.starred === true);

			setStarredProjects(newStarredList);

			return newData;
		});
	};

	const createProject = (title: string) => {
		const newProjectId = uuidv4();

		setProjects((prevData: any) => {
			const newProject = {
				id: newProjectId,
				projectTitle: title,
				columns: {},
				tasks: {},
				columnOrder: [],
				starred: false,
			};

			const newData = [...prevData, newProject];

			return newData;
		});
	};

	return (
		<Flex px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
			{/* <Heading bgClip='text' textAlign='center' w='50%' bgGradient='linear(to-r, #660708,#ba181b,#e5383b)' mb={6}>
				Dashboard
			</Heading> */}

			<Heading pb={4} pl={4} w='fit-content'>
				<Flex align='center'>
					<StarIcon w={7} h={7} mr={4} color='yellow.400' />
					Starred
				</Flex>
			</Heading>

			<ProjectsList
				projects={starredProjects}
				showAddNew={false}
				addToStarred={addToStarred}
				removeFromStarred={removeFromStarred}
				deleteProject={deleteProject}
			/>
			<Heading pb={4} pt={6} pl={4}>
				<Flex align='center'>
					<CalendarIcon w={7} h={7} mr={4} color='red.400' />
					Projects
				</Flex>
			</Heading>
			<ProjectsList
				projects={projects}
				showAddNew={true}
				createProject={createProject}
				addToStarred={addToStarred}
				removeFromStarred={removeFromStarred}
				deleteProject={deleteProject}
			/>
		</Flex>
	);
};

export default Projects;
