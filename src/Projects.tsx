import { CalendarIcon, StarIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import ProjectsList from "./components/Projects/ProjectsList";
import initialData from "./testdata";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./contexts/AuthContext";

interface Props {}

const Projects = (props: Props) => {
	// Auth Context
	const { user } = useAuth();

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
				issues: {},
				columnOrder: [],
				starred: false,
			};

			const newData = [...prevData, newProject];

			return newData;
		});
	};

	return (
		<Flex px={5} py={6} flexDirection='column' minH='90vh' h='auto' ml='50px'>
			{/* <Heading bgClip='text' textAlign='center' w='50%' bgGradient='linear(to-r, #660708,#ba181b,#e5383b)' mb={6}>
				Dashboard
			</Heading> */}
			{user ? (
				<>
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
				</>
			) : (
				<Flex flexDirection='column' align='center'>
					<Heading>You must sign in/up</Heading>
					<svg xmlns='http://www.w3.org/2000/svg' width='115' height='45' viewBox='0 0 115 45'>
						<g fill='none' stroke='#000' stroke-width='1.5' stroke-linecap='round' stroke-miterlimit='10'>
							<path d='M108.519 35.397c-9.013 8.839-24.133 9.449-34.974 3.485-4.474-2.461-10.037-7.56-8.195-13.4.818-2.596 4.623-7.007 7.465-3.78 3.573 4.061-3.756 11.358-6.245 13.396-6.997 5.731-16.648 7.996-25.507 6.503-20.278-3.415-29.921-23.09-37.544-39.87' />
							<path
								stroke-linejoin='round'
								d='M109.988 43.269c-.98-4.277 1.606-7.742 1.49-11.938-2.883 1.396-8.855 3.965-12.196 3.507'
							/>
						</g>
					</svg>
				</Flex>
			)}
		</Flex>
	);
};

export default Projects;
