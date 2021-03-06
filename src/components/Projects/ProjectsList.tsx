import React from "react";
import { Grid } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import CreateProject from "./CreateProject";

interface Props {
	projects: any;
	showAddNew: boolean;
	addToStarred: (projectId: string) => void;
	deleteProject: (projectId: string) => void;
	removeFromStarred: (projectId: string) => void;
	createProject?: (title: string) => void;
}

const ProjectsList = ({ projects, showAddNew, addToStarred, removeFromStarred, deleteProject, createProject }: Props) => {
	return (
		<Grid
			w='100%'
			overflowX='auto'
			p={4}
			templateColumns={[
				`repeat(1,min-content)`,
				`repeat(2,min-content)`,
				`repeat(3,min-content)`,
				`repeat(4,min-content)`,
				`repeat(5,min-content)`,
			]}
			gap={5}>
			{projects.map((project: any) => {
				return (
					<ProjectCard
						key={project.id}
						project={project}
						addToStarred={addToStarred}
						removeFromStarred={removeFromStarred}
						deleteProject={deleteProject}
					/>
				);
			})}
			{showAddNew && <CreateProject createProject={createProject} />}
		</Grid>
	);
};

export default ProjectsList;
