import React from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import IssueModal from "./IssueModal";

interface Props {
	issue: {
		id: string;
		title: string;
		description?: string;
	};
	index: any;
	delIssue: (id: any, columnId: any) => void;
	columnId: any;
}

const IssueCard = ({ issue, index, delIssue, columnId }: Props) => {
	// * ChakraUI
	// Modal hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Draggable draggableId={issue.id} index={index}>
			{(provided, snapshot) => (
				<Box
					rounded='lg'
					shadow='sm'
					bg={snapshot.isDragging ? "blue.100" : "white"}
					w='100%'
					h='fit-content'
					minH='100px'
					mb={3}
					p='10px'
					onClick={onOpen}
					style={{ userSelect: "none" }}
					_hover={{ backgroundColor: "#EBECF0", cursor: "pointer" }}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<Flex flexDirection='column' h='100%' justify='space-between'>
						<Text>{issue.title}</Text>
						{/* <Flex justify='space-between' align='center'>
					<Stack gap={2} display='flex' align='center' isInline>
						<Text>{issue.issuePriority}</Text>
						{issue.issueStatus === "In Progress" ? <CheckIcon /> : <NotAllowedIcon />}
					</Stack>
					<Avatar name={issue.creatorName} size='sm' />
				</Flex> */}
					</Flex>

					{isOpen && (
						<IssueModal isOpen={isOpen} onClose={onClose} issue={issue} delIssue={delIssue} columnId={columnId} />
					)}
				</Box>
			)}
		</Draggable>
	);
};

export default IssueCard;
