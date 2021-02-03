import React from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import CreateProject from "./CreateProject";

interface Props {
	projects: any;
	showAddNew: boolean;
}

const ProjectsList = ({ projects, showAddNew }: Props) => {
	return (
		<Grid
			w={showAddNew ? "100%" : "fit-content"}
			overflowX='auto'
			p={4}
			templateColumns={showAddNew ? `repeat(${projects.length + 1},1fr)` : `repeat(${projects.length},1fr)`}
			gap={5}>
			{projects.map((project: any) => {
				return <ProjectCard project={project} />;
			})}
			{showAddNew && <CreateProject />}
		</Grid>
	);
};

export default ProjectsList;
