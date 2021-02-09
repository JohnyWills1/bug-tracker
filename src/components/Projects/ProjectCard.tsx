import { CloseIcon, StarIcon } from "@chakra-ui/icons";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
	project: any;
	addToStarred: (projectId: string) => void;
	deleteProject: (projectId: string) => void;
	removeFromStarred: (projectId: string) => void;
}

const ProjectCard = ({ project, addToStarred, removeFromStarred, deleteProject }: Props) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = React.useRef(null);

	return (
		<>
			<Box
				rounded='lg'
				border='1px solid #EBEBEB'
				w='250px'
				h='150px'
				p={2}
				// bgColor={project.background}
				_hover={{ boxShadow: "outline" }}
				shadow='base'>
				<Flex w='100%' h='100%' flexDirection='column'>
					<Flex justify='space-between'>
						<IconButton
							color={project.starred ? "yellow.400" : "gray.400"}
							aria-label='add to favourites'
							icon={<StarIcon />}
							variant='ghost'
							size='xs'
							onClick={() => (project.starred ? removeFromStarred(project.id) : addToStarred(project.id))}
						/>
						<IconButton
							variant='ghost'
							aria-label='delete project'
							icon={<CloseIcon />}
							size='xs'
							onClick={() => setIsOpen(true)}
						/>
						<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
							<AlertDialogOverlay>
								<AlertDialogContent>
									<AlertDialogHeader fontSize='lg' fontWeight='bold'>
										Delete Project
									</AlertDialogHeader>

									<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

									<AlertDialogFooter>
										<Button ref={cancelRef} onClick={onClose}>
											Cancel
										</Button>
										<Button
											colorScheme='red'
											onClick={() => {
												onClose();
												deleteProject(project.id);
											}}
											ml={3}>
											Delete
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialogOverlay>
						</AlertDialog>
					</Flex>
					<Link to={"/projects/" + project.id} style={{ width: "100%", height: "100%" }}>
						{/* Make this text black border, white inner as it can be read over any color */}
						<Flex align='center' justify='center' w='100%' h='100%'>
							{project.projectTitle}
						</Flex>
					</Link>
				</Flex>
			</Box>
		</>
	);
};

export default ProjectCard;
