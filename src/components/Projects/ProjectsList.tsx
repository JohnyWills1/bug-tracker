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
}

const ProjectsList = ({ projects, showAddNew, addToStarred, removeFromStarred, deleteProject }: Props) => {
	return (
		<Grid
			w='100%'
			overflowX='auto'
			p={4}
			templateColumns={showAddNew ? `repeat(${projects.length + 1},min-content)` : `repeat(${projects.length},min-content)`}
			gap={5}>
			{projects.map((project: any) => {
				return (
					<ProjectCard
						project={project}
						addToStarred={addToStarred}
						removeFromStarred={removeFromStarred}
						deleteProject={deleteProject}
					/>
				);
			})}
			{showAddNew && <CreateProject />}
		</Grid>
	);
};

export default ProjectsList;
