import React from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import IssueModal from "./IssueModal";
import { Route, useHistory, useRouteMatch } from "react-router-dom";

interface Props {
	issue: {
		id: string;
		title: string;
		description?: string;
		priority?: string;
		comments?: [
			{
				id: string;
				content: string;
				datePosted: string;
				user: string;
			}
		];
		type: string;
		assignees: [string];
		reporter: string;
		timeEstimate: number;
		dateCreated: string;
		dateUpdated: string;
	};
	index: any;
	delIssue: (id: any, columnId: any) => void;
	changeIssueTitle: (arg0: any, arg1: any) => void;
	columnId: any;
	columns: any;
}

const IssueCard = ({ issue, index, delIssue, columnId, columns, changeIssueTitle }: Props) => {
	// * ChakraUI
	// Modal hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	// React Router
	const match = useRouteMatch();
	const history = useHistory();

	return (
		<Draggable draggableId={issue.id} index={index}>
			{(provided, snapshot) => {
				return (
					<Box w='100%' h='100%' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Box
							rounded='lg'
							w='100%'
							h='fit-content'
							minH='100px'
							mb={3}
							p='10px'
							onClick={() => {
								onOpen();
							}}
							userSelect='none'
							transform={snapshot.isDragging && !snapshot.isDropAnimating ? ` rotate(5deg)` : `none`}
							shadow={snapshot.isDragging ? `5px 10px 30px 0px rgba(9, 30, 66, 0.15)` : `md`}
							backgroundColor='white'
							_hover={{ backgroundColor: "#EBECF0", cursor: "pointer" }}>
							<Flex flexDirection='column' h='100%' justify='space-between'>
								<Text>{issue.title}</Text>
							</Flex>
							{isOpen && (
								<IssueModal
									columns={columns}
									isOpen={isOpen}
									onClose={onClose}
									issue={issue}
									delIssue={delIssue}
									columnId={columnId}
									changeIssueTitle={changeIssueTitle}
								/>
							)}
						</Box>
					</Box>
				);
			}}

			{/* <Flex justify='space-between' align='center'>
					<Stack gap={2} display='flex' align='center' isInline>
						<Text>{issue.issuePriority}</Text>
						{issue.issueStatus === "In Progress" ? <CheckIcon /> : <NotAllowedIcon />}
					</Stack>
					<Avatar name={issue.creatorName} size='sm' />
				</Flex> */}
		</Draggable>
	);
};

export default IssueCard;
